import React, { useState, useEffect } from "react"
import "./AirFryerForm.css"

interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  costGuess: string
  spidrPin: string
}

const AirFryerForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    costGuess: "",
    spidrPin: "",
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (field: keyof FormData, value: string): void => {
    if (field === "spidrPin") {
      const digits = value.replace(/\D/g, "").slice(0, 16)
      const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1-")
      setFormData((prev) => ({ ...prev, [field]: formatted }))
    } else if (field === "costGuess") {
      const numbers = value.replace(/[^\d.]/g, "")
      setFormData((prev) => ({ ...prev, [field]: numbers }))
    } else if (field === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10)
      const formatted = digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
      setFormData((prev) => ({ ...prev, [field]: formatted }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Air Fryer Interest Form Submission:", {
      ...formData,
      costGuess: `$${formData.costGuess}`,
      submittedAt: new Date().toISOString(),
    })

    setIsSubmitting(false)
    alert("Thanks for your interest! Check the console for your submission data.")
  }

  const isFormValid: boolean =
    Object.values(formData).every((value) => value.trim() !== "") && 
    formData.spidrPin.replace(/-/g, "").length === 16

  return (
    <div className="form-container">
      {/* Background web pattern */}
      <div className="web-pattern">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="web" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path 
                d="M50 0L50 100M0 50L100 50M25 25L75 75M75 25L25 75" 
                stroke="#479daf" 
                strokeWidth="0.5" 
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#web)" />
        </svg>
      </div>

      {/* Left side - Image (65%) */}
      <div className="image-section">
        <div className={`image-container ${isVisible ? "visible" : ""}`}>
          <img
            src="/airfryer-kitchen.jpeg"
            alt="Woman cooking with air fryer in modern kitchen"
            className="background-image"
          />
        </div>
      </div>

      {/* Right side - Dark background (35%) */}
      <div className="dark-section"></div>

      {/* Form overlay - spans across both sections */}
      <div className={`form-overlay ${isVisible ? "visible" : ""}`}>
        <div className="form-box">
          <div className="form-content">
            {/* Header */}
            <div className="form-header">
              <h1 className="form-title">Air Fryer Interest Form</h1>
              <div className="title-underline"></div>
              <p className="form-description">
                Help us unveil our magnificent cooking appliance.
                <br />
                <span className="form-subtitle">
                  (Yes, this is completely fictitious and ridiculous. We know.)
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="form">
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="form-input"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="form-input"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="form-input"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Cost Guess */}
              <div className="form-group cost-field">
                <label htmlFor="costGuess" className="form-label">
                  Guess the Air Fryer's Cost 💰
                </label>
                <div className="input-with-prefix">
                  <span className="input-prefix">$</span>
                  <input
                    id="costGuess"
                    type="text"
                    value={formData.costGuess}
                    onChange={(e) => handleInputChange("costGuess", e.target.value)}
                    className="form-input with-prefix"
                    placeholder="199.99"
                    required
                  />
                </div>
                <p className="input-help">
                  Take your best guess! Winner gets bragging rights.
                </p>
              </div>

              {/* PIN */}
              <div className="form-group full-width">
                <label htmlFor="spidrPin" className="form-label">
                  Very, Very Secret 16-Digit Spidr PIN 🕷️
                </label>
                <input
                  id="spidrPin"
                  type="text"
                  value={formData.spidrPin}
                  onChange={(e) => handleInputChange("spidrPin", e.target.value)}
                  className="form-input pin-input"
                  placeholder="1234-5678-9012-3456"
                  maxLength={19}
                  required
                />
                <p className="input-help">
                  Digits are formatted with dashes in groups of four "####-####-####-####".
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={!isFormValid || isSubmitting} 
                className="submit-button"
              >
                {isSubmitting ? (
                  <div className="loading-indicator">
                    <div className="spinner"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit Interest Form"
                )}
              </button>

              {/* Footer */}
              <div className="form-footer">
                <p className="footer-text">
                  This form logs to console. Check your browser's developer tools after submission.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirFryerForm