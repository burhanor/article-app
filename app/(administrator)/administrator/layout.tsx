export default function AdministratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <p>Admin Layout</p>
      {children}
    </> // herhangi bir layout sarmalaması yok
  );
}
