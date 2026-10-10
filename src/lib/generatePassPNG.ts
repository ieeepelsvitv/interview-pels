import { Recruit } from '@/types';

export function generateSuperhumanPassPNG(cand: Recruit) {
  const cvs = document.createElement('canvas');
  const dpr = 2; // retina
  const w = 1400 * dpr;
  const h = 800 * dpr;
  cvs.width = w;
  cvs.height = h;
  const c = cvs.getContext('2d')!;
  c.scale(dpr, dpr);
  const W = 1400, H = 800;

  const isDay1 = cand.day.includes('Day 1');
  const accent = isDay1 ? '#421d24' : '#714cb6';
  const accentSoft = isDay1 ? '#5a2933' : '#8d68c9';

  // Parchment background
  c.fillStyle = '#f2f0eb';
  c.fillRect(0, 0, W, H);

  // Card shadow
  c.shadowColor = 'rgba(66, 29, 36, 0.18)';
  c.shadowBlur = 40;
  c.shadowOffsetY = 20;

  // Card body
  const rx = 60, ry = 60, rw = W - 120, rh = H - 120, rr = 32;
  c.beginPath();
  c.moveTo(rx + rr, ry);
  c.arcTo(rx + rw, ry, rx + rw, ry + rh, rr);
  c.arcTo(rx + rw, ry + rh, rx, ry + rh, rr);
  c.arcTo(rx, ry + rh, rx, ry, rr);
  c.arcTo(rx, ry, rx + rw, ry, rr);
  c.closePath();
  c.fillStyle = '#ffffff';
  c.fill();
  c.shadowColor = 'transparent';

  // Gradient top band
  const grad = c.createLinearGradient(rx, ry, rx + rw, ry);
  grad.addColorStop(0, '#421d24');
  grad.addColorStop(0.5, '#714cb6');
  grad.addColorStop(1, '#0c4243');
  c.fillStyle = grad;
  c.fillRect(rx, ry, rw, 10);

  // Corner concentric pattern
  c.save();
  c.globalAlpha = 0.06;
  c.strokeStyle = accent;
  c.lineWidth = 1;
  for (let i = 1; i <= 6; i++) {
    c.beginPath();
    c.arc(rx + rw, ry, i * 40, 0, Math.PI * 2);
    c.stroke();
  }
  c.restore();

  // "ADMIT PASS" badge
  c.fillStyle = '#f2f0eb';
  c.strokeStyle = '#e3e3e2';
  c.lineWidth = 1;
  const badgeX = rx + 60, badgeY = ry + 50, badgeW = 160, badgeH = 36, badgeR = 8;
  c.beginPath();
  c.moveTo(badgeX + badgeR, badgeY);
  c.arcTo(badgeX + badgeW, badgeY, badgeX + badgeW, badgeY + badgeH, badgeR);
  c.arcTo(badgeX + badgeW, badgeY + badgeH, badgeX, badgeY + badgeH, badgeR);
  c.arcTo(badgeX, badgeY + badgeH, badgeX, badgeY, badgeR);
  c.arcTo(badgeX, badgeY, badgeX + badgeW, badgeY, badgeR);
  c.closePath();
  c.fill();
  c.stroke();

  c.fillStyle = accent;
  c.font = '600 11px Inter, sans-serif';
  c.textBaseline = 'middle';
  c.fillText('✦  ADMIT PASS', badgeX + 22, badgeY + badgeH / 2);

  // Name label
  c.fillStyle = '#666666';
  c.font = '500 11px Inter, sans-serif';
  c.fillText('CANDIDATE', badgeX, badgeY + badgeH + 36);

  // Name (editorial serif, large)
  c.fillStyle = '#292827';
  c.font = '460 52px Georgia, "Newsreader", serif';
  c.fillText(cand.name, badgeX, badgeY + badgeH + 96);

  // Reg number + VIT
  c.fillStyle = '#f2f0eb';
  c.strokeStyle = '#e3e3e2';
  const regText = cand.reg_no;
  const regW = c.measureText(regText).width + 30;
  c.beginPath();
  c.moveTo(badgeX + 6, badgeY + badgeH + 118);
  c.arcTo(badgeX + regW, badgeY + badgeH + 118, badgeX + regW, badgeY + badgeH + 148, 6);
  c.arcTo(badgeX + regW, badgeY + badgeH + 148, badgeX, badgeY + badgeH + 148, 6);
  c.arcTo(badgeX, badgeY + badgeH + 148, badgeX, badgeY + badgeH + 118, 6);
  c.arcTo(badgeX, badgeY + badgeH + 118, badgeX + regW, badgeY + badgeH + 118, 6);
  c.closePath();
  c.fill();
  c.stroke();
  c.fillStyle = '#292827';
  c.font = '500 14px "Courier New", monospace';
  c.fillText(regText, badgeX + 15, badgeY + badgeH + 137);

  c.fillStyle = '#666666';
  c.font = '460 14px Inter, sans-serif';
  c.fillText('VIT Vellore', badgeX + regW + 12, badgeY + badgeH + 137);

  // Domains
  c.fillStyle = '#666666';
  c.font = '500 11px Inter, sans-serif';
  c.fillText('APPLIED DOMAINS', badgeX, badgeY + badgeH + 188);

  c.fillStyle = '#292827';
  c.font = '500 16px Inter, sans-serif';
  c.fillText(`▸  ${cand.domain1}`, badgeX, badgeY + badgeH + 216);
  c.fillStyle = '#666666';
  c.font = '460 15px Inter, sans-serif';
  c.fillText(`▹  ${cand.domain2}`, badgeX, badgeY + badgeH + 240);

  // Right side: Day block
  const rightX = rx + 820;

  // Day badge pill
  c.fillStyle = accent;
  const dayPillW = 140, dayPillH = 44;
  c.beginPath();
  c.moveTo(rightX + 12, ry + 60);
  c.arcTo(rightX + dayPillW, ry + 60, rightX + dayPillW, ry + 60 + dayPillH, 12);
  c.arcTo(rightX + dayPillW, ry + 60 + dayPillH, rightX, ry + 60 + dayPillH, 12);
  c.arcTo(rightX, ry + 60 + dayPillH, rightX, ry + 60, 12);
  c.arcTo(rightX, ry + 60, rightX + dayPillW, ry + 60, 12);
  c.closePath();
  c.fill();
  c.fillStyle = '#ffffff';
  c.font = '600 16px Inter, sans-serif';
  c.textAlign = 'center';
  c.fillText(isDay1 ? 'DAY 01' : 'DAY 02', rightX + dayPillW / 2, ry + 60 + dayPillH / 2 + 5);
  c.textAlign = 'left';

  c.fillStyle = '#666666';
  c.font = '500 11px Inter, sans-serif';
  c.fillText('INTERVIEW DAY', rightX, ry + 60 - 10);

  // Schedule block
  const schedY = ry + 170;
  c.fillStyle = '#f2f0eb';
  c.strokeStyle = '#e3e3e2';
  c.beginPath();
  c.moveTo(rightX + 12, schedY);
  c.arcTo(rightX + 460, schedY, rightX + 460, schedY + 220, 12);
  c.arcTo(rightX + 460, schedY + 220, rightX, schedY + 220, 12);
  c.arcTo(rightX, schedY + 220, rightX, schedY, 12);
  c.arcTo(rightX, schedY, rightX + 460, schedY, 12);
  c.closePath();
  c.fill();
  c.stroke();

  // Giant clock watermark inside schedule block
  c.save();
  c.globalAlpha = 0.06;
  c.strokeStyle = accent;
  c.lineWidth = 2;
  c.beginPath();
  c.arc(rightX + 380, schedY + 110, 70, 0, Math.PI * 2);
  c.stroke();
  c.beginPath();
  c.moveTo(rightX + 380, schedY + 110);
  c.lineTo(rightX + 380, schedY + 60);
  c.moveTo(rightX + 380, schedY + 110);
  c.lineTo(rightX + 420, schedY + 110);
  c.stroke();
  c.restore();

  c.fillStyle = '#666666';
  c.font = '500 11px Inter, sans-serif';
  c.fillText('DATE', rightX + 28, schedY + 34);
  c.fillStyle = '#292827';
  c.font = '500 20px Inter, sans-serif';
  c.fillText(cand.day, rightX + 28, schedY + 62);
  c.fillStyle = '#666666';
  c.font = '460 13px Inter, sans-serif';
  c.fillText(cand.date_display, rightX + 28, schedY + 82);

  c.fillStyle = '#666666';
  c.font = '500 11px Inter, sans-serif';
  c.fillText('TIME SLOT (5 MIN)', rightX + 28, schedY + 126);
  c.fillStyle = accent;
  c.font = 'bold 28px "Courier New", monospace';
  c.fillText(cand.slot_time, rightX + 28, schedY + 162);

  c.fillStyle = '#666666';
  c.font = '460 12px Inter, sans-serif';
  c.fillText(`Panel: ${cand.panel}`, rightX + 28, schedY + 196);

  // Perforated dashed divider (ticket style)
  c.strokeStyle = '#e3e3e2';
  c.lineWidth = 1.5;
  c.setLineDash([6, 6]);
  c.beginPath();
  c.moveTo(rx + 60, H - 150);
  c.lineTo(rx + rw - 60, H - 150);
  c.stroke();
  c.setLineDash([]);

  // Ticket notches
  c.fillStyle = '#f2f0eb';
  c.beginPath();
  c.arc(rx, H - 150, 16, 0, Math.PI * 2);
  c.fill();
  c.beginPath();
  c.arc(rx + rw, H - 150, 16, 0, Math.PI * 2);
  c.fill();

  // Footer info
  c.fillStyle = '#666666';
  c.font = '500 12px "Courier New", monospace';
  c.fillText(`REF #PELS-${String(cand.id).padStart(3, '0')}`, rx + 60, H - 110);

  c.fillStyle = accent;
  c.font = '600 13px Inter, sans-serif';
  c.textAlign = 'right';
  c.fillText('IEEE POWER ELECTRONICS SOCIETY • VIT', rx + rw - 60, H - 110);

  c.fillStyle = '#999999';
  c.font = '460 11px Inter, sans-serif';
  c.fillText('Please join 3 minutes prior with working mic & webcam', rx + rw - 60, H - 85);
  c.textAlign = 'left';

  // Download
  const link = document.createElement('a');
  link.download = `IEEE_PELS_Pass_${cand.reg_no}.png`;
  link.href = cvs.toDataURL('image/png');
  link.click();
}