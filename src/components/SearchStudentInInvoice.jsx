import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../helper/axiosInstance';
import { FaTimes } from 'react-icons/fa';

function SearchStudentInInvoice({ handleSearch }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const registrationInputRef = useRef(null);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length >= 2) {
            try {
                const response = await axiosInstance.get(`/invoices/matching-registrations?query=${value}`);
                setSuggestions(response.data.data);
            } catch (error) {
                console.error("Error fetching registrations: ", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const clearQuery = () => {
        setQuery("");
        setSuggestions([]);
        registrationInputRef.current.focus(); // Focus the input field after clearing
    };

    return (
        <form onSubmit={handleSearch} className="mb-6 max-w-lg mx-auto p-6">
            <div className="relative flex flex-col items-center">
                <label className="block text-lg font-medium text-gray-700">Search Student Details:</label>
                <div className="relative w-full">
                    <input
                        type="text"
                        name="query"
                        required
                        value={query}
                        onChange={handleChange}
                        placeholder="Enter Full Name (Registration Num)"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FB3239] focus:border-transparent pr-10"
                        ref={registrationInputRef}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={clearQuery}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            <FaTimes className="text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>
                {suggestions.length > 0 && (
                    <ul className="divide-y divide-gray-200 absolute top-20 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer text-start hover:bg-gray-100"
                                onClick={() => {
                                    setQuery(`${suggestion.fullName} ${suggestion.registrationNum}`);
                                    handleSearch(suggestion.registrationNum)
                                    setSuggestions([]);
                                }}
                            >
                                <span className="font-medium">{suggestion.fullName} </span>
                                <span className="text-gray-500">{suggestion.registrationNum}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </form>
    )
}

export default SearchStudentInInvoice