import React, { useMemo } from 'react';
import { QrCode, Printer, Download, MapPin, Calendar, Users, ShieldCheck, Building2 } from 'lucide-react';

// Deterministic QR-like SVG grid generated purely client-side from booking/order ID
const DeterministicQrSvg = ({ code }) => {
  const cells = useMemo(() => {
    const size = 11;
    const grid = [];
    let seed = 0;
    for (let i = 0; i < (code || 'BURLA').length; i++) {
      seed = (seed * 31 + code.charCodeAt(i)) % 1000003;
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Corner finder markers
        const topLeft = r < 3 && c < 3;
        const topRight = r < 3 && c >= size - 3;
        const bottomLeft = r >= size - 3 && c < 3;
        if (topLeft || topRight || bottomLeft) {
          const inner = (r === 1 && c === 1) || (r === 1 && c === size - 2) || (r === size - 2 && c === 1);
          const border = r === 0 || r === 2 || c === 0 || c === 2 || r === size - 3 || r === size - 1 || c === size - 3 || c === size - 1;
          if (inner || border) grid.push(`${r}-${c}`);
          continue;
        }
        const hash = ((r + 3) * (c + 7) * (seed + 17)) % 13;
        if (hash < 6) grid.push(`${r}-${c}`);
      }
    }
    return grid;
  }, [code]);

  return (
    <svg viewBox="0 0 11 11" className="w-24 h-24 bg-white p-1.5 rounded-xl border border-gray-200 shadow-xs">
      {cells.map((key) => {
        const [r, c] = key.split('-').map(Number);
        return <rect key={key} x={c} y={r} width="0.92" height="0.92" rx="0.15" fill="#1B4332" />;
      })}
    </svg>
  );
};

export const HotelBookingVoucher = ({ order }) => {
  if (!order) return null;

  const stayItem = (order.items || []).find(i => i.bookingDetails || i.category === 'hotels-services') || order.items?.[0];
  const isHotelOrder = Boolean(stayItem?.bookingDetails) || stayItem?.category === 'hotels-services' || (order.shopName || '').toLowerCase().includes('residency');

  if (!isHotelOrder) return null;

  const details = stayItem?.bookingDetails || {};

  const handlePrintVoucher = () => {
    window.print();
  };

  const handleDownloadVoucher = () => {
    const voucherHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Burlamart Stay Pass - ${order.id}</title>
<style>body{font-family:sans-serif;padding:32px;color:#111;max-width:640px;margin:auto;} .card{border:2px solid #1B4332;border-radius:16px;padding:24px;} h1{color:#1B4332;margin-top:0;}</style>
</head>
<body>
<div class="card">
  <h1>Burlamart Verified Stay Voucher</h1>
  <p><strong>Booking ID:</strong> ${order.id}</p>
  <p><strong>Property:</strong> ${stayItem?.name || order.shopName}</p>
  <p><strong>Guest:</strong> ${order.customerName || 'Verified Guest'} (${order.customerPhone || '+91 98765 43210'})</p>
  <p><strong>Check-in:</strong> ${details.checkInDate || 'Tomorrow 12:00 PM'} | <strong>Check-out:</strong> ${details.checkOutDate || 'Standard 11:00 AM'}</p>
  <p><strong>Guests & Rooms:</strong> ${details.rooms || details.roomsCount || 1} Room(s), ${details.adults || details.adultsCount || 2} Adult(s)</p>
  <p><strong>Total Paid:</strong> ₹${order.totalAmount}</p>
  <p><strong>Note:</strong> Please carry a valid Govt. Photo ID (Aadhaar/Passport/DL) at front desk check-in.</p>
</div>
</body></html>`;
    const blob = new Blob([voucherHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Burlamart-Stay-Voucher-${order.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-[#1B4332]/20 shadow-lg overflow-hidden text-left print:shadow-none">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-extrabold uppercase tracking-wider">Verified Stay Pass / E-Voucher</span>
        </div>
        <span className="font-mono text-xs font-bold bg-white/15 px-2.5 py-0.5 rounded-full">
          #{order.id}
        </span>
      </div>

      {/* Body with QR */}
      <div className="p-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
        <div className="space-y-2.5 flex-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Confirmed Check-In Pass
            </span>
            <h3 className="text-base font-black text-gray-900 mt-1">
              {stayItem?.name || order.shopName}
            </h3>
            <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#e01933]" />
              <span>{details.destination ? `${details.destination}, Odisha` : 'Burla / Sambalpur, Odisha'}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF8F5] p-3 rounded-2xl border border-gray-100">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Check-In</span>
              <span className="font-bold text-gray-900 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-700" />
                {details.checkInDate || '12:00 PM'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Occupancy</span>
              <span className="font-bold text-gray-900 flex items-center gap-1">
                <Users className="w-3 h-3 text-emerald-700" />
                {details.rooms || details.roomsCount || 1}R • {details.adults || details.adultsCount || 2}G
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Show this QR pass + Govt. Photo ID at hotel reception</span>
          </div>
        </div>

        {/* Deterministic QR Code & Pass Actions */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <DeterministicQrSvg code={order.id} />
          <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
            <QrCode className="w-3 h-3" /> Check-in QR
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 print:hidden">
        <button
          type="button"
          onClick={handlePrintVoucher}
          className="px-3.5 py-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save PDF</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadVoucher}
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Booking Pass</span>
        </button>
      </div>
    </div>
  );
};

