import { Recruit } from '@/types';

export function generateGoogleCalendarUrl(cand: Recruit) {
  const startDate = new Date(cand.iso_start);
  const endDate = new Date(cand.iso_end);

  const formatGCalTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const title = encodeURIComponent(`IEEE PELS Interview: ${cand.name} (${cand.reg_no})`);
  const details = encodeURIComponent(
    `IEEE PELS VIT Vellore — Junior Core Recruitment Interview\n\n` +
    `Candidate: ${cand.name} (${cand.reg_no})\n` +
    `Domain: ${cand.domain1}\n` +
    `Slot: ${cand.slot_time}\n` +
    `Join Google Meet: ${cand.meet_link}\n\n` +
    `Please ensure you join with working mic and webcam.`
  );
  const location = encodeURIComponent(cand.meet_link);
  const dates = `${formatGCalTime(startDate)}/${formatGCalTime(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}