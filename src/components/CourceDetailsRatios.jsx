import React, { useState } from 'react'
import CedepInformation from '../components/CedepInformation'
import { options } from '../data/options';


function StudentPage() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    service: '',
    post: '',
    level: '',
    bank: '',
    department: '',
    paper: []
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImage(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const updatedPaper = checked
          ? [...prev.paper, value]
          : prev.paper.filter((item) => item !== value);
        return { ...prev, paper: updatedPaper };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const renderOptions = (optionsArray) =>
    optionsArray.map((opt) => (
      <label key={opt.value} className="inline-flex items-center">
        <input
          type="radio"
          name={opt.type}
          value={opt.value}
          checked={formData[opt.type] === opt.value}
          onChange={handleChange}
          className="form-radio"
        />
        <span className="ml-2">{opt.label}</span>
      </label>
    ));

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

          {/* Service Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Service *</label>
            <div className="flex space-x-4">
              {renderOptions(
                options.service.map((s) => ({ ...s, type: 'service' }))
              )}
            </div>
          </div>

          {/* Conditional Fields */}
          {formData.service && (
            <>
              {/* Public Service Commission (PSC) */}
              {formData.service === 'Public Service Commission (PSC)' && (
                <div className="mb-4">
                  <label className="block text-gray-700">Post *</label>
                  <div className="flex space-x-4">
                    {renderOptions(
                      options.service
                        .find((s) => s.value === formData.service)
                        .post.map((p) => ({ ...p, type: 'post' }))
                    )}
                  </div>
                </div>
              )}

              {/* Teacher Service Commission (TSC) */}
              {formData.service === 'Teacher Service Commission (TSC)' && (
                <div className="mb-4">
                  <label className="block text-gray-700">Level *</label>
                  <div className="flex space-x-4">
                    {renderOptions(
                      options.service
                        .find((s) => s.value === formData.service)
                        .level.map((l) => ({ ...l, type: 'level' }))
                    )}
                  </div>
                </div>
              )}

              {/* Banking Service */}
              {formData.service === 'Banking Service' && (
                <div className="mb-4">
                  <label className="block text-gray-700">Bank *</label>
                  <div className="flex space-x-4">
                    {renderOptions(
                      options.service
                        .find((s) => s.value === formData.service)
                        .bank.map((b) => ({ ...b, type: 'bank' }))
                    )}
                  </div>
                </div>
              )}

              {/* Health Service */}
              {formData.service === 'Health Service' && (
                <div className="mb-4">
                  <label className="block text-gray-700">Post *</label>
                  <div className="flex space-x-4">
                    {renderOptions(
                      options.service
                        .find((s) => s.value === formData.service)
                        .post.map((p) => ({ ...p, type: 'post' }))
                    )}
                  </div>
                </div>
              )}

              {/* Defense Service */}
              {formData.service === 'Defense Service' && (
                <div className="mb-4">
                  <label className="block text-gray-700">Department *</label>
                  <div className="flex space-x-4">
                    {renderOptions(
                      options.service
                        .find((s) => s.value === formData.service)
                        .department.map((d) => ({ ...d, type: 'department' }))
                    )}
                  </div>
                </div>
              )}

              {/* Paper Fields */}
              {['Public Service Commission (PSC)', 'Teacher Service Commission (TSC)'].includes(formData.service) &&
                formData.post && (
                  <div className="mb-4">
                    <label className="block text-gray-700">Paper *</label>
                    <div className="flex flex-wrap space-x-4">
                      {options.service
                        .find((s) => s.value === formData.service)
                        .post.find((p) => p.value === formData.post)
                        .paper.map((paper) => (
                          <label key={paper.value} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              name="paper"
                              value={paper.value}
                              checked={formData.paper.includes(paper.value)}
                              onChange={handleChange}
                              className="form-checkbox"
                            />
                            <span className="ml-2">{paper.label}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                )}

              {formData.service === 'Banking Service' &&
                formData.bank &&
                formData.level && (
                  <div className="mb-4">
                    <label className="block text-gray-700">Paper *</label>
                    <div className="flex flex-wrap space-x-4">
                      {options.service
                        .find((s) => s.value === formData.service)
                        .bank.find((b) => b.value === formData.bank)
                        .level.find((l) => l.value === formData.level)
                        .paper.map((paper) => (
                          <label key={paper.value} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              name="paper"
                              value={paper.value}
                              checked={formData.paper.includes(paper.value)}
                              onChange={handleChange}
                              className="form-checkbox"
                            />
                            <span className="ml-2">{paper.label}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>

  )
}

export default StudentPage