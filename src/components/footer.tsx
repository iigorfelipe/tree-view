export const contacts = [
  {
    link: 'mailto:iigorfelipe@gmail.com',
    label: 'email',
    iconPath: './mail.svg',
  },
  {
    link: 'https://www.linkedin.com/in/iigor-felipe/',
    label: 'linkedin',
    iconPath: './linkedin.svg',
  },
  {
    link: 'https://github.com/iigorfelipe',
    label: 'github',
    iconPath: './github.svg',
  },
  {
    link: 'https://wa.me/5598991595038',
    label: 'whatsapp',
    iconPath: './phone.svg',
  },
];

export const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-around gap-5 py-12 px-2 relative bottom-0 w-full bg-section">
      <div className="flex gap-5">
        {contacts.map(({ label, link, iconPath }) => (
          <button
            key={label}
            onClick={() => window.open(link, '_blank')}
            className="cursor-pointer bg-transparent border-none p-0 flex items-center"
          >
            <img src={iconPath} alt="icon" />
          </button>
        ))}
      </div>

      <button
        onClick={() => window.open('https://github.com/iigorfelipe/tree-view', '_blank')}
        className="cursor-pointer bg-transparent border-none p-0 flex items-center gap-1 text-light underline"
      >
        Gituhub do projeto
        <>
          <img src="./external-link.svg" alt="" />
        </>
      </button>
    </div>
  );
};
