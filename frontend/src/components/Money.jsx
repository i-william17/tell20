export default function Money({ value }) {
  const amount = Math.round(Number(value || 0));
  return <span>KSh {amount.toLocaleString("en-KE")}</span>;
}
