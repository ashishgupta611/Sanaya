export const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "ContactUs", path: "/contact-us" },
  { name: "Community", path: "/community" },
  { name: "News", path: "/news" },
];

// Style options for auth buttons - choose one
export const authButtonStyles = {
  // Option 1: Minimal outline
  minimal: `border px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50`,

  // Option 2: Solid buttons
  solid: `px-4 py-2 rounded-md text-sm font-medium transition-colors`,

  // Option 3: Gradient buttons
  gradient: `px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700`,

  // Option 4: Pill-shaped buttons
  pill: `px-4 py-2 rounded-full text-sm font-medium transition-colors border`,
};
