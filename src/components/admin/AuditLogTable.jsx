import React from 'react';
import { FileText } from 'lucide-react';

export const AuditLogTable = ({ auditLogs }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-extrabold text-base text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
        <FileText className="w-5 h-5 text-purple-700" />
        <span>Setting Change Audit Trail (Page 8)</span>
      </h3>
      <div className="divide-y divide-gray-100">
        {auditLogs?.map(log => (
          <div key={log.id} className="py-2.5 flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-gray-900">{log.action}</span>
              <div className="text-[11px] text-gray-400">Admin: {log.admin}</div>
            </div>
            <span className="text-gray-400 font-mono text-[11px]">{log.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

