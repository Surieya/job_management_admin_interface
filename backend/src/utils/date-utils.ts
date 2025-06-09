// src/utils/date-utils.ts
export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // diff in seconds

  const units = [
    { label: 'mo', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diff / unit.seconds);
    if (interval >= 1) {
      return `${interval}${unit.label}`;
    }
  }
  return 'just now';
}


export function getAverageSalary(minSalary: number, maxSalary: number): number {
  const average = (minSalary + maxSalary) / 2;
  return Math.ceil(average/100000);
}