import { Card, CardContent } from "@/components/ui/card";

// Leaderboard component displays the sorted list of users with their ranks and points
const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="my-8 w-full max-w-2xl mx-auto">
      <div className="relative mb-6">
        <div className="h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-30"></div>
        </div>
      </div>
      <Card className="glass-card shadow-2xl border-0 overflow-hidden backdrop-blur-md">
        <div className="bg-gradient-to-br from-white/60 to-white/30 p-8 rounded-2xl">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg">
            🏆 Leaderboard
          </h2>
          <div className="bg-white/60 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-400 to-pink-400 px-6 py-4">
              <div className="grid grid-cols-3 gap-4 text-white font-semibold">
                <div>Rank</div>
                <div>Name</div>
                <div>Points</div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {leaderboard.map((user, index) => (
                <div
                  key={user._id}
                  className={`px-6 py-4 hover:bg-white/40 transition-all duration-200 rounded-xl ${index === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-200' :
                      index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100' :
                        index === 2 ? 'bg-gradient-to-r from-orange-50 to-orange-100' : ''
                    }`}
                >
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="flex items-center gap-2">
                      {index === 0 && <span className="text-2xl">🥇</span>}
                      {index === 1 && <span className="text-2xl">🥈</span>}
                      {index === 2 && <span className="text-2xl">🥉</span>}
                      <span className={`font-bold ${index === 0 ? 'text-yellow-600' :
                          index === 1 ? 'text-gray-600' :
                            index === 2 ? 'text-orange-600' : 'text-gray-700'
                        }`}>
                        #{index + 1}
                      </span>
                    </div>
                    <div className="font-medium text-gray-800 text-lg tracking-wide">{user.name}</div>
                    <div className="font-bold text-xl text-indigo-600 drop-shadow-sm">{user.points}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;