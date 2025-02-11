import { useState } from "react";
import axios from "axios";

import ClassifierHeader from "../components/ClassifierHeader";
import DescriptionsList from "../components/DescriptionsList";
import MemoryCard from "../components/MemoryCard";
import Spinner from "../../shared/spinner/Spinner";

import classes from "./Classifier.module.css";

// ✅ Load API URL from .env, fallback to localhost if undefined
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const Classifier = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [htsComplete, setHtsComplete] = useState(false);
  const [htsNo, setHtsNo] = useState(""); // State to hold the htsNo
  const [selectedDescriptions, setSelectedDescriptions] = useState([]); // To hold selected descriptions
  const [loading, setLoading] = useState(false); // State to track if loading

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search term.");
      setResults([]);
      return;
    }
    try {
      setError("");
      setResults([]);
      setLoading(true); // ✅ Show loader

      // ✅ API Call with backend URL
      const response = await axios.get(
        `${BACKEND_URL}/classify/get-unique-headingId`,
        {
          params: { query },
        }
      );

      const data = response.data;
      if (data.length > 0) {
        setResults(data);
      } else {
        setError(
          <p className={classes.error_message}>
            <strong>
              No results found, try again with more general terms for your item.
            </strong>
          </p>
        );
      }
    } catch (err) {
      console.error("Search API Error:", err); // Debugging
      setError(
        "An error occurred while fetching the results. Please try again."
      );
    } finally {
      setLoading(false); // ✅ Hide loader when done
    }
  };

  //********************************************************* */
  const handleItemSelect = async (
    htsNo,
    indent,
    description,
    headingId,
    uniqueIndex
  ) => {
    setHtsNo(htsNo);
    const isHtsComplete = htsNo.length === 10;
    setHtsComplete(isHtsComplete);
    setSelectedDescriptions((prev) => [...prev, { htsNo, description }]);

    if (isHtsComplete) return; // ✅ Stop API call if HTS is complete

    const dynamicIndent = indent + 1;
    // console.log("Sending to backend:", { uniqueIndex, dynamicIndent });

    try {
      setLoading(true); // ✅ Show loader for this request

      // ✅ API Call with backend URL
      const response = await axios.post(
        `${BACKEND_URL}/classify/get-next-indent`,
        {
          uniqueIndex,
          dynamicIndent,
        }
      );

      const data = response.data;
      if (data.length > 0) {
        setResults(data);
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error fetching next indent:", error);
    } finally {
      setLoading(false); // ✅ Hide loader when done
    }
  };

  // Reset button logic
  const handleReset = () => {
    setQuery("");
    setResults([]);
    setError("");
    setHtsComplete(false);
    setHtsNo("");
    setSelectedDescriptions([]);
  };

  //********************************************************* */

  return (
    <main className={classes.main}>
      <section className={classes.classifier_section}>
        <div>
          <ClassifierHeader />

          {!results.length > 0 && (
            <div>
              <h1>Start by typing your item's general description</h1>
              <h3>In a few words, tell me about your item</h3>
            </div>
          )}

          {!results.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Enter a search term"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  padding: "10px",
                  width: "100%",
                  maxWidth: "400px",
                  marginRight: "10px",
                }}
              />
              <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
                Search
              </button>
            </div>
          )}

          {/* ✅ Show overlay loader during API calls */}
          {loading && (
            <div className={classes.loader_overlay}>
              <Spinner />
            </div>
          )}

          {error && <p className={classes.error_message}>{error}</p>}

          {htsComplete && (
            <div className={classes.hts_complete}>
              <h2>
                Your HTS Classification Is Complete <br />
                Your HTS Number is: {htsNo}
              </h2>
            </div>
          )}

          {results.length > 0 && !htsComplete && (
            <div>
              <h1 style={{ color: "#90ff1e" }}>
                Please select a description that best describes your item
              </h1>
              <DescriptionsList
                items={results}
                onItemSelect={handleItemSelect}
              />
            </div>
          )}

          {selectedDescriptions.length > 0 && (
            <>
              <div className={classes.local_title}>
                {!htsComplete && <h1>Your Selected Description:</h1>}
                {htsComplete && <h1>Provided For:</h1>}
              </div>

              <div className={classes.memory_cards}>
                {selectedDescriptions.map((desc, index) => (
                  <MemoryCard key={index} className={classes.memory_card}>
                    <h3>{desc.description}</h3>
                  </MemoryCard>
                ))}
              </div>
            </>
          )}

          {(results.length > 0 || htsComplete) && (
            <button onClick={handleReset} style={{ marginTop: "20px" }}>
              {htsComplete ? "Search another item" : "Start over"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Classifier;
