import React, { useState } from 'react';

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  
  const [leads] = useState<Lead[]>([
    { id: "1", name: "Rahul Sharma", email: "rahul@example.com", status: "Active", source: "LinkedIn", createdAt: "2026-05-20" },
    { id: "2", name: "Anjali Patel", email: "anjali@example.com", status: "Pending", source: "Website", createdAt: "2026-05-19" },
    { id: "3", name: "Amit Verma", email: "amit@example.com", status: "Completed", source: "Google", createdAt: "2026-05-18" },
    { id: "4", name: "Priya Das", email: "priya@example.com", status: "Active", source: "LinkedIn", createdAt: "2026-05-17" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sourceFilter, setSourceFilter] = useState('All Sources');

  
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'All Sources' || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  
  const handleExportCSV = () => {
    const headers = 'ID,Name,Email,Status,Source,Date\n';
    const rows = filteredLeads.map(l => `${l.id},${l.name},${l.email},${l.status},${l.source},${l.createdAt}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'GigFlow_Smart_Leads.csv');
    a.click();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', boxSizing: 'border-box' }}>
      
     
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>GigFlow Smart Leads</h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem', margin: 0 }}>Track and manage your potential business leads</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#4b5563', fontWeight: '500' }}>(Admin)</span>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Logout
          </button>
        </div>
      </div>

      
      <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flex: 1, flexWrap: 'wrap' }}>
            
            <div style={{ flex: 2, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.4rem' }}>SEARCH LEADS</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '1rem' }}
              />
            </div>

            
            <div style={{ flex: 1, minWidth: '120px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.4rem' }}>FILTER STATUS</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white', fontSize: '1rem', height: '38px' }}>
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>

           
            <div style={{ flex: 1, minWidth: '120px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.4rem' }}>FILTER SOURCE</label>
              <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white', fontSize: '1rem', height: '38px' }}>
                <option>All Sources</option>
                <option>LinkedIn</option>
                <option>Website</option>
                <option>Google</option>
              </select>
            </div>
          </div>

         
          <button onClick={handleExportCSV} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', height: '38px' }}>
            Export to CSV
          </button>
        </div>
      </div>

    
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '1rem', color: '#374151', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '1rem', color: '#374151', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '1rem', color: '#374151', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1rem', color: '#374151', fontWeight: '600' }}>Source</th>
              <th style={{ padding: '1rem', color: '#374151', fontWeight: '600' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', color: '#111827', fontWeight: '500' }}>{lead.name}</td>
                  <td style={{ padding: '1rem', color: '#4b5563' }}>{lead.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: '50px',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      backgroundColor: lead.status === 'Active' ? '#d1fae5' : lead.status === 'Pending' ? '#fef3c7' : '#e0f2fe',
                      color: lead.status === 'Active' ? '#065f46' : lead.status === 'Pending' ? '#92400e' : '#0369a1'
                    }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#4b5563' }}>{lead.source}</td>
                  <td style={{ padding: '1rem', color: '#6b7280' }}>{lead.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                  No leads found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;