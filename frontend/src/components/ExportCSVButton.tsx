export const ExportCSVButton = ({ data }: { data: any[] }) => {
  const downloadCSV = () => {
    if (data.length === 0) {
      alert("dawnload karne ke liye koi data nahi hai!");
      return;
    }

    const headers = ['Name,Email,Status,Source,CreatedAt\n'];

     const rows = data.map(lead => 
      `"${lead.name}","${lead.email}","${lead.status}","${lead.source}","${new Date(lead.createdAt).toLocaleDateString()}"`
    );

   const csvContent = headers.concat(rows.join('\n')).join('');

 const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "gigflow_leads.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={downloadCSV}
      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
    >
      Export to CSV
    </button>
  );
};