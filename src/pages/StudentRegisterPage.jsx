import React, { useState } from 'react'
import CedepInformation from '../components/CedepInformation'
import { options } from '../data/options';


function StudentRegisterPage() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [image, setImage] = useState(null);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setSelectedPost('');
    setSelectedPapers([]);
  };
  console.log(selectedService);

  const handlePostChange = (e) => {
    setSelectedPost(e.target.value);
    setSelectedPapers([]);
  };

  const handlePaperChange = (e) => {
    const value = e.target.value;
    setSelectedPapers(prevState =>
      prevState.includes(value)
        ? prevState.filter(paper => paper !== value)
        : [...prevState, value]
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImage(file);
    }
  };

  const getPostsOrLevels = () => {
    const service = options.service.find((s) => s.value === selectedService);
    if (!service) return [];

    return service.post || service.level || service.bank || service.department || [];
  };

  const getPapers = () => {
    const postsOrLevels = getPostsOrLevels();
    const post = postsOrLevels.find((p) => p.value === selectedPost);
    if (!post) return [];

    return post.paper || [];
  };

  const getPostLabel = () => {
    switch (selectedService) {
      case 'Public Service Commission (PSC)':
      case 'Health Service':
        return 'Post';
      case 'Teacher Service Commission (TSC)':
        return 'Level';
      case 'Banking Service':
        return 'Bank';
      case 'Defense Service':
        return 'Department';
      default:
        return 'Post/Level';
    }
  };


  return (
    <div>
      <CedepInformation />
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Personal Details */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Details</h3>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700" htmlFor="fullName">Full Name*</label>
              <input className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="fullName" name="fullName" required />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700" htmlFor="address">Permanent Address*</label>
              <input className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="address" name="address" required />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700" htmlFor="email">E-mail*</label>
              <input className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" id="email" name="email" required />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700" htmlFor="mobileNumber">Mobile Number*</label>
              <input className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="tel" id="mobileNumber" name="mobileNumber" required />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700" htmlFor="telephoneNumber">Telephone Number</label>
              <input className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="tel" id="telephoneNumber" name="telephoneNumber" />
            </div>
            <div className="flex flex-col ">
              <label className="mb-2 font-semibold text-gray-700" htmlFor="passportPhoto">Recent Passport Size Photo*</label>
              <input
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="file"
                id="passportPhoto"
                name="passportPhoto"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {image && (
                <div className="mt-4">
                  <img src={image} alt="Passport Preview" className="w-32 h-32 object-cover rounded-md border border-gray-300" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Submit</button>
          </div>
        </form>

        {/* Course Details */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Course Details</h2>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700" htmlFor="service">Service*</label>
            <select
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="service"
              value={selectedService}
              onChange={handleServiceChange}
              required
            >
              <option value="">Select a service</option>
              {options.service.map((service) => (
                <option key={service.value} value={service.value}>{service.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700" htmlFor="post">{getPostLabel()}*</label>
            <select
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="post"
              value={selectedPost}
              onChange={handlePostChange}
              required
            >
              <option value="">Select a {getPostLabel().toLowerCase()}</option>
              {getPostsOrLevels().map((post) => (
                <option key={post.value} value={post.value}>{post.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-semibold text-gray-700">Papers*</label>
            <div className="flex flex-wrap gap-4">
              {getPapers().map((paper) => (
                <div key={paper.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={paper.value}
                    name="paper"
                    value={paper.value}
                    checked={selectedPapers.includes(paper.value)}
                    onChange={handlePaperChange}
                    className="mr-2"
                  />
                  <label htmlFor={paper.value} className="text-gray-700">{paper.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentRegisterPage