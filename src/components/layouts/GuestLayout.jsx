const GuestLayout = ({ children }) => (
    <div>
      <header>Guest Header</header>
      <main>{children}</main>
      <footer>Guest Footer</footer>
    </div>
  );
  
  export default GuestLayout;