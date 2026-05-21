import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import Lead from '../models/Lead';

// 1. GET ALL LEADS CONTROLLER
export const getLeads = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { search, status, source, sortBy, page = 1, limit = 10 } = req.query;
    const query: any = {};

    // Search Logic
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter Logic
    if (status && status !== 'All Status') query.status = status;
    if (source && source !== 'All Sources') query.source = source;

    // Sorting Logic
    let sortOptions: any = { createdAt: -1 };
    if (sortBy === 'Oldest Created') sortOptions = { createdAt: 1 };

    const skip = (Number(page) - 1) * Number(limit);
    const totalLeads = await Lead.countDocuments(query);
    const leads = await Lead.find(query).sort(sortOptions).skip(skip).limit(Number(limit));

    res.status(200).json({
      success: true,
      leads,
      pagination: {
        totalLeads,
        currentPage: Number(page),
        totalPages: Math.ceil(totalLeads / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
      error: error.message
    });
  }
};

// 2. EXPORT LEADS TO CSV CONTROLLER (इसके बिना राउट्स में रेड लाइन आ रही थी)
export const exportLeadsCSV = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });

    let csvContent = 'Name,Email,Source,Status,Created At\n';

    leads.forEach((lead) => {
      const name = lead.name.replace(/,/g, ' ');
      const email = lead.email;
      const source = lead.source || 'N/A';
      const status = lead.status || 'New';
      const date = lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A';
      
      csvContent += `${name},${email},${source},${status},${date}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads_report.csv');
    
    res.status(200).send(csvContent);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate CSV',
      error: error.message
    });
  }
};