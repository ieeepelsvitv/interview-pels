import { Recruit } from '@/types';

export function generateSuperhumanPassPNG(cand: Recruit) {
  const cvs = document.createElement('canvas');
  const w = 1200;
  const h = 675;
  cvs.width = w;
  cvs.height = h;
  const c = cvs.getContext('2d')!;

  // Background
  c.fillStyle = '#f2f0eb';
  c.fillRect(0, 0, w, h);
  c.strokeStyle = '#e3e3e2';
  c.lineWidth = 2;
  c.strokeRect(20, 20, w - 40, h - 40);

  // Main Card
  c.fillStyle = '#ffffff';
  c.fillRect(50, 50, w - 100, h - 100);
  c.strokeStyle = '#e3e3e2';
  c.lineWidth = 1.5;
  c.strokeRect(50, 50, w - 100, h - 100);

  // Header
  c.fillStyle = '#421d24';
  c.fillRect(80, 80, 160, 36);
  c.fillStyle = '#ffffff';
  c.font = '500 13px Inter, sans-serif';
  c.fillText('IEEE PELS VIT', 105, 103);

  c.fillStyle = '#666666';
  c.font = '460 14px Inter, sans-serif';
  c.fillText('JUNIOR CORE RECRUITMENT 2026–27', 260, 103);

  // Details
  c.fillStyle = '#666666';
  c.font = '500 12px Inter, sans-serif';
  c.fillText('CANDIDATE NAME', 80, 175);

  c.fillStyle = '#292827';
  c.font = '460 38px Inter, sans-serif';
  c.fillText(cand.name, 80, 225);

  c.fillStyle = '#666666';
  c.font = '500 16px Inter, monospace';
  c.fillText(`REG NO: ${cand.reg_no}`, 80, 265);

  // Schedule Block
  c.fillStyle = '#f2f0eb';
  c.fillRect(660, 160, 460, 310);
  c.strokeStyle = '#e3e3e2';
  c.lineWidth = 1;
  c.strokeRect(660, 160, 460, 310);

  c.fillStyle = '#666666';
  c.font = '500 12px Inter, sans-serif';
  c.fillText('INTERVIEW DATE', 690, 200);

  c.fillStyle = '#292827';
  c.font = '500 22px Inter, sans-serif';
  c.fillText(cand.day, 690, 235);

  c.fillStyle = '#666666';
  c.font = '500 12px Inter, sans-serif';
  c.fillText('ALLOCATED TIME (5 MINS)', 690, 320);

  c.fillStyle = '#421d24';
  c.font = 'bold 28px Inter, monospace';
  c.fillText(cand.slot_time, 690, 360);

  // Footer
  c.fillStyle = '#666666';
  c.font = '460 12px Inter, sans-serif';
  c.fillText(`DOCKET REFERENCE: #PELS-${String(cand.id).padStart(2, '0')}`, 80, 520);

  c.fillStyle = '#421d24';
  c.font = '500 13px Inter, sans-serif';
  c.fillText('IEEE Power Electronics Society • VIT Vellore', w - 380, 520);

  // Download
  const link = document.createElement('a');
  link.download = `IEEE_PELS_Pass_${cand.reg_no}.png`;
  link.href = cvs.toDataURL('image/png');
  link.click();
}