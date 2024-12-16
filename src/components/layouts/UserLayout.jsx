// components/layouts/UserLayout.jsx
const UserLayout = ({ children }) => (
    <div>
      <header>User Header</header>
      <main>{children || <div>No content available</div>}</main> {/* Fallback if children is null */}
      <footer>User Footer</footer>
    </div>
  );
  
  export default UserLayout;
  