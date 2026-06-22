const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/mecsu.vn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.026 4.388 11.019 10.125 11.927v-8.438H7.078v-3.489h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.955.931-1.955 1.886v2.263h3.328l-.532 3.489h-2.796V24C19.612 23.092 24 18.099 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com/mecsublog",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.968 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/blogmecsu/_saved/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCWk2JNx47XkfcJY-eVEhGnA",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.499 6.203a3.008 3.008 0 0 0-2.117-2.13C19.505 3.568 12 3.568 12 3.568s-7.505 0-9.382.505A3.008 3.008 0 0 0 .501 6.203C0 8.09 0 12.025 0 12.025s0 3.935.501 5.822a3.008 3.008 0 0 0 2.117 2.13c1.877.505 9.382.505 9.382.505s7.505 0 9.382-.505a3.008 3.008 0 0 0 2.117-2.13c.501-1.887.501-5.822.501-5.822s0-3.935-.501-5.822ZM9.545 15.59V8.46l6.273 3.565-6.273 3.565Z" />
      </svg>
    ),
  },
  {
    label: "Zalo",
    href: "https://zalo.me/1018683493594176170",
    icon: (
      <span className="text-[15px] font-normal">Zalo</span>
    ),
  },
];

export function FooterSocials() {
  return (
    <div className="mb-7 flex flex-wrap gap-3">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-[#8A8A8A] transition-colors duration-200 hover:bg-slate-100 hover:text-[#163F78]"
          aria-label={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
