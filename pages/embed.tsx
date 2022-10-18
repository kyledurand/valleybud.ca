import Script from "next/script";

export default function Embed() {
  return (
    <Script
      async={false}
      defer={false}
      id="dutchie--embed__script"
      src="https://dutchie.com/api/v2/embedded-menu/62faac762c50bd00aa734b8c.js"
    />
  );
}
