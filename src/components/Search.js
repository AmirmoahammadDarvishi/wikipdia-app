import React, { useState, useEffect } from "react";
import axios from "axios";
const Search = () => {
      const [term, setTerm] = useState("programing");
      const [resualts, setResualts] = useState([]);
      console.log(resualts);
      useEffect(() => {
            const search = async () => {
                  const { data } = await axios.get(
                        "https://en.wikipedia.org/w/api.php",
                        {
                              params: {
                                    action: "query",
                                    list: "search",
                                    origin: "*",
                                    format: "json",
                                    srsearch: term,
                              },
                        }
                  );
                  setResualts(data.query.search);
            };
            if (term && resualts.length) {
                  search();
            } else {
                  const timeoutId = setTimeout(() => {
                        if (term) {
                              search();
                        }
                  }, 500);
                  return () => clearTimeout(timeoutId);
            }
      }, [term]);
      const renderResualt = resualts.map(resualt => {
            return (
                  <div key={resualt.pageid} className="card my-2">
                        <div className="card-header">{resualt.title}</div>
                        <div className="card-body">
                              <span
                                    dangerouslySetInnerHTML={{
                                          __html: resualt.snippet,
                                    }}
                              ></span>
                              <br />
                              <a
                                    href={`https://en.wikipedia.org?curid=${resualt.pageid}`}
                                    className="ui green basic button mt-4"
                              >
                                    Go
                              </a>
                        </div>
                  </div>
            );
      });
      return (
            <div>
                  <label className="my-2 form-label" for="search">
                        Search
                  </label>
                  <input
                        id="search"
                        className="form-control mb-2"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                  />
                  {renderResualt}
            </div>
      );
};
export default Search;
