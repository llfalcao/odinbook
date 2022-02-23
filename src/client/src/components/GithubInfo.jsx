export default function GithubInfo() {
  return (
    <a
      style={{
        position: 'fixed',
        left: '1rem',
        bottom: '1rem',
        width: '2.5rem',
        height: '2.5rem',
        zIndex: 2,
      }}
      href="https://github.com/llfalcao/odinbook"
      alt="llfalcao on GitHub"
      target="_blank"
      rel="noreferrer"
      className="info"
    >
      <img
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          borderRadius: '100%',
        }}
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        alt="GitHub"
      />
    </a>
  );
}
