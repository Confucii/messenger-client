function Header({ interlocutor }: { interlocutor: string }) {
  return (
    <div className="px-4 py-2 text-2xl shadow-bottom z-10">{interlocutor}</div>
  );
}

export default Header;
