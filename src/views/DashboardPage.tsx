import GameCard from "@/components/GameCard";
import Layout from "@/components/Layout";

// Assets
import BLOXBURG_CASHIER_THUMBNAIL from "@/assets/bloxburg/cashier/thumbnail.png";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="px-12 py-4 text-center">
        <div className="grid grid-cols-4 gap-4">
          <GameCard
            src={BLOXBURG_CASHIER_THUMBNAIL}
            alt="bloxburg delivery"
            tab="bloxburg/cashier"
          />
          <button className="hover:opacity-75 transition-opacity duration-500">
            <div className="h-32 px-4 bg-zinc-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-lg">
                Comming Soon. . .
              </span>
            </div>
          </button>
          <button className="hover:opacity-75 transition-opacity duration-500">
            <div className="h-32 px-4 bg-zinc-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-lg">
                Comming Soon. . .
              </span>
            </div>
          </button>
          <button className="hover:opacity-75 transition-opacity duration-500">
            <div className="h-32 px-4 bg-zinc-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-lg">
                Comming Soon. . .
              </span>
            </div>
          </button>{" "}
          <button className="hover:opacity-75 transition-opacity duration-500">
            <div className="h-32 px-4 bg-zinc-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-lg">
                Comming Soon. . .
              </span>
            </div>
          </button>{" "}
          <button className="hover:opacity-75 transition-opacity duration-500">
            <div className="h-32 px-4 bg-zinc-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-lg">
                Comming Soon. . .
              </span>
            </div>
          </button>{" "}
          <button className="hover:opacity-75 transition-opacity duration-500">
            <div className="h-32 px-4 bg-zinc-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-lg">
                Comming Soon. . .
              </span>
            </div>
          </button>
          <button className="hover:opacity-75 transition-opacity duration-500">
            <div className="h-32 px-4 bg-zinc-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-lg">
                Comming Soon. . .
              </span>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
}
