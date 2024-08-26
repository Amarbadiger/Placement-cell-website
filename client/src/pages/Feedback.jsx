import React from "react";

const Feedback = () => {
  return (
    <div className="feedback-container p-10 bg-slate-200 min-h-screen shadow-md rounded-md">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Gogte Placements Feedback
      </h2>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScjFDhA8cUmI2kh87x_I11jc_OmC4zd8Q87bsyRUX_bAPs1LA/viewform?embedded=true"
        width="100%"
        height="721"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Feedback Form"
        className="rounded"
      >
        Loading…
      </iframe>
    </div>
  );
};

export default Feedback;
