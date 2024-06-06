import Main from "@/components/main";
import SideBar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex flex-row">
      <SideBar />
      <Main />
    </div>
  );
}
