import { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ThreeDCardDemo({ selectedCategory, searchQuery }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError("");

      try {
        const options = {
          method: "GET",
          url: `https://free-to-play-games-database.p.rapidapi.com/api/filter`,
          params: {
            tag: selectedCategory,
            platform: "pc",
          },
          headers: {
            "x-rapidapi-key": "c49d6d8a20msh270d8275ae9a107p1535bfjsna60275f02166",
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        setGames(response.data);
      } catch (err) {
        setError("Failed to fetch games");
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedCategory]);

  const filteredGames = games.filter((game) => {
    if (!searchQuery) return true;
    return (
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleGameClick = (game) => {
    navigate(`/game/${game.id}`, { state: { game, category: selectedCategory } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center p-4 bg-red-500/10 rounded-lg">
        {error}
      </div>
    );
  }

  if (filteredGames.length === 0) {
    return (
      <div className="text-white text-center p-4">
        No games found for the selected criteria.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="lg:col-span-4 sm:col-span-6 col-span-12"
            onClick={() => handleGameClick(game)}
          >
            <CardContainer className="inter-var w-full cursor-pointer">
              <CardBody className="relative group/card h-max dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-black border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {game.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {game.short_description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src={game.thumbnail}
                    height="1000"
                    width="1000"
                    className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={game.title}
                  />
                </CardItem>
                <CardItem
                  translateZ="50"
                  className="text-sm mt-4 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 w-fit"
                >
                  {game.genre}
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        ))}
      </div>
    </>
  );
}