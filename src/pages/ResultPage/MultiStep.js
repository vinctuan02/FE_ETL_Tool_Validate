import React, { useState } from 'react';

const Step1 = ({ nextStep, handleChange, values }) => (
  <div>
    <h2>Step 1</h2>
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange('name')}
      />
    </label>
    <button onClick={nextStep}>Next</button>
  </div>
);

const Step2 = ({ prevStep, nextStep, handleChange, values }) => (
  <div>
    <h2>Step 2</h2>
    <label>
      Email:
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange('email')}
      />
    </label>
    <button onClick={prevStep}>Previous</button>
    <button onClick={nextStep}>Next</button>
  </div>
);

const Step3 = ({ prevStep, handleChange, values, handleSubmit }) => (
  <div>
    <h2>Step 3</h2>
    <label>
      Password:
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange('password')}
      />
    </label>
    <button onClick={prevStep}>Previous</button>
    <button onClick={handleSubmit}>Submit</button>
  </div>
);

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleChange = input => e => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = () => {
    // Xử lý dữ liệu khi submit form
    console.log(formData);
  };

  switch (step) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 2:
      return (
        <Step2
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 3:
      return (
        <Step3
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return <div />;
  }
};

export default MultiStepForm;
