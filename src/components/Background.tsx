/** Fixed decorative backdrop: warm ivory, soft blurred glows and faint botanical / aroma-wave line art. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ivory">
      <div className="absolute -left-32 -top-40 size-[34rem] rounded-full bg-champagne/60 blur-3xl" />
      <div className="absolute -right-40 top-1/3 size-[30rem] rounded-full bg-[#DCE5DD]/70 blur-3xl" />
      <div className="absolute -bottom-48 left-1/4 size-[28rem] rounded-full bg-gold/15 blur-3xl" />

      {/* Botanical sprig, top right */}
      <svg
        className="absolute -right-10 top-16 w-[22rem] text-forest opacity-[0.07] sm:w-[28rem]"
        viewBox="0 0 400 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M60 380 C 140 300, 220 220, 360 40" />
        <path d="M130 312 C 100 280, 92 240, 108 206 C 136 234, 146 274, 130 312 Z" />
        <path d="M130 312 C 170 304, 206 316, 228 344 C 190 352, 156 340, 130 312 Z" />
        <path d="M200 238 C 172 206, 168 166, 188 132 C 214 164, 220 204, 200 238 Z" />
        <path d="M200 238 C 240 232, 276 246, 296 276 C 256 282, 222 268, 200 238 Z" />
        <path d="M272 156 C 250 126, 250 90, 270 62 C 292 92, 294 128, 272 156 Z" />
        <path d="M272 156 C 306 152, 336 166, 352 192 C 318 196, 290 184, 272 156 Z" />
      </svg>

      {/* Aroma waves, bottom left */}
      <svg
        className="absolute -left-16 bottom-10 w-[26rem] text-gold opacity-[0.16] sm:w-[34rem]"
        viewBox="0 0 500 220"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M0 160 C 80 110, 160 210, 250 150 S 420 90, 500 130" />
        <path d="M0 185 C 90 135, 170 230, 260 172 S 430 115, 500 155" />
        <path d="M0 135 C 70 88, 150 186, 240 128 S 410 66, 500 104" />
      </svg>

      {/* Fine grain to soften gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(23,61,50,0.035)_1px,transparent_1px)] [background-size:18px_18px]" />
    </div>
  );
}
