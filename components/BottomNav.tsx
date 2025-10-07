import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// Define the type for a navigation link
interface NavLink {
  title: string;
  link: string;
}

const BottomNav = () => {
  const location = usePathname();
  const router = useRouter();
  const currentPath = location;

  const links: NavLink[] = [
    { title: "Ref", link: "/supported/ref" },
    { title: "Rank", link: "/supported/rank" },
    { title: "Tasks", link: "/supported/tasks" },
    { title: "Swap", link: "/supported/swap" },
  ];

  return (
    <div className="fixed bottom-0 w-full text-white flex items-center justify-center">
      {/* Central navigation button */}
      <div
        onClick={() => router.push('/')}
        className="absolute z-20 w-20 h-20 flex items-center justify-center bottom-9 cursor-pointer"
      >
        <Image
          src="/circle.png"
          className="w-full h-full object-cover"
          alt="Home Button"
        />
      </div>

      {/* Navigation links */}
      <div className="grid grid-cols-4 w-full">
        {links.map((linkInfo) => (
          <Link
            key={linkInfo.link}
            href={linkInfo.link}
            className={`p-5 border-t-4 border-[#02354C] font-bold flex items-center justify-center ${
              currentPath === linkInfo.link ? "active-nav" : "nav-btn"
            }`}
          >
            {linkInfo.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;