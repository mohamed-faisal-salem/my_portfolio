import React from 'react';

const About: React.FC = () => {
  const handleDownloadCV = () => {
    const cvPath = '/cv.pdf';

    fetch(cvPath)
      .then(res => {
        if (!res.ok) throw new Error();
        window.open(cvPath, '_blank');
      })
      .catch(() => {
        alert('CV file is not available yet.');
      });
  };

  return (
    <section
      id="about"
      className="pt-[4rem] pb-[12rem]"
    >
      {/* Title */}
      <h2
        className="text-[3rem] font-bold mb-[3rem] relative inline-block text-white"
      >
        About Me
        <span
          className="absolute left-0 -bottom-[10px] w-1/2 h-[4px] rounded-[2px]
                     bg-gradient-to-r from-blue-500 to-purple-600"
        />
      </h2>

      {/* Content */}
      <div
        className="
          glass
          grid
          grid-cols-1
          md:grid-cols-2
          gap-[4rem]
          items-center
          w-full
          p-0
          rounded-[16px]
          overflow-hidden
        "
      >
        {/* Text */}
        <div className="about-text pl-[22px]">
          <p
            className="text-[17px] opacity-90 leading-relaxed mb-[1.5rem] text-slate-300"
          >
            I am Mohamed Faisal, a second-year student at the Faculty of Computers and Artificial Intelligence, Cairo University.
            <br />
            I am passionate about exploring how machine learning and deep learning can transform real-world applications, with a particular interest in building intelligent systems that understand and process human language. Currently, I am developing my skills through academic studies and practical challenges.
            <br />
            My vision is to bridge academic knowledge with industry-level expertise, contributing to impactful AI solutions.
            <br />
            Always learning. Always building. Always pushing boundaries.
          </p>

          <div className="cv-btn-wrapper">
            <button
              onClick={handleDownloadCV}
              className="
                inline-flex
                items-center
                gap-2
                px-6
                py-3
                rounded-lg
                bg-blue-600/20
                border
                border-blue-500/50
                text-blue-400
                cursor-pointer
              "
              title="CV coming soon"
            >
              <i className="fas fa-download"></i>
              View CV
            </button>
          </div>
        </div>

        {/* Image */}
        <div
          className="
    relative
    h-[400px]
    rounded-[10px]
    overflow-hidden
    shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]
  "
        >
          <img
            src="/my_photo.png"
            alt="Mohamed Faisal"
            className="w-full h-full object-cover rounded-[10px]"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://picsum.photos/600/600';
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
