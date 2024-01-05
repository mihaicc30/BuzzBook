import React, { useEffect, useRef, useState } from "react";
import { auth, logInWithEmailAndPassword, logIntoTestUser, signInWithGoogle } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const nav = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [loginDetails, setLoginDetails] = useState({
    e: "",
    p: "",
  });

  useEffect(() => {
    if (user) nav("/dashboard");
  }, [user, nav]);

  const [img, setImg] = useState(2);
  const timer = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImg((prev) => (prev === 2 ? 1 : prev + 1));
    }, 3111);

    return () => clearInterval(intervalId);
  }, []);

  const handleSignInWithCredentials = async () => {
    const q = await logInWithEmailAndPassword(loginDetails);
    if (String(q).startsWith("Firebase")) {
      setLoginDetails((prev) => ({ ...prev, err: "Invalid credentials." }));
    } else {
      setLoginDetails({
        e: "",
        p: "",
      });
    }
  };

  const logInWithGoogle = async() => {
    await signInWithGoogle()
  }

  return (
    <>
      {hcPattern()}

      <div className=" flex flex-col z-10 bg-[#69696917] w-[100svw] mx-auto overflow-y-auto overflow-x-hidden">
        <nav className={`absolute left-0 top-0 flex w-full justify-end pt-2 pb-4 px-8 z-10 bg-gradient-to-b from-90% from-[#f5f5f5fa] to-transparent`}>
          <button className={`max-md:hidden px-2 py-1 group  cursor-pointer relative z-20`}>
            <span className="text-lg font-[600] border-[1px] border-orange-400 rounded-lg px-4 py-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">Features</span>
          </button>

          <button className={`max-md:hidden px-2 py-1 group  cursor-pointer relative z-20`}>
            <span className="text-lg font-[600] border-[1px] border-orange-400 rounded-lg px-4 py-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">Pricing</span>
          </button>

          <button className={`max-md:hidden px-2 py-1 group  cursor-pointer relative z-20`}>
            <span className="text-lg font-[600] border-[1px] border-orange-400 rounded-lg px-4 py-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">
              Support
              <FaChevronDown className="text-sm" />
            </span>
            <span className="hidden group-focus:flex absolute top-[100%] left-1/2 -translate-x-1/2 flex-col justify-center  z-30 animate-fadeIN">
              <span className="my-1 p-2 cursor-pointer z-40 flex flex-nowarp items-center whitespace-nowrap bg-white border-2 rounded-lg">
                <LuServerCog className="text-xl min-w-[50px] text-green-500" /> Training
              </span>
              <span className="my-1 p-2 cursor-pointer z-40 flex flex-nowarp items-center whitespace-nowrap bg-white border-2 rounded-lg">
                <MdPhonelinkSetup className="text-xl min-w-[50px] text-purple-500" /> Setup
              </span>
              <span className="my-1 p-2 cursor-pointer z-40 flex flex-nowarp items-center whitespace-nowrap bg-white border-2 rounded-lg">
                <SiSimpleanalytics className="text-xl min-w-[50px] text-yellow-500" /> Suggestion
              </span>
              <span className="my-1 p-2 cursor-pointer z-40 flex flex-nowarp items-center whitespace-nowrap bg-white border-2 rounded-lg">
                <FaBlenderPhone className="text-xl min-w-[50px] text-blue-500" /> Contact
              </span>
            </span>
          </button>

          <button className={`max-md:hidden px-2 py-1 group  cursor-pointer relative z-20`}>
            <span className="text-lg font-[600] border-[1px] border-orange-400 bg-orange-400 text-[#16172F] rounded-lg px-4 py-1 whitespace-nowrap">Book Demo</span>
          </button>

          <button className={`px-2 py-1 group  cursor-pointer relative z-20`}>
            <span className="text-lg font-[600] border-[1px] border-orange-400 rounded-lg px-4 py-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">
              Sign in
              <FaChevronDown className="text-sm" />
            </span>
            {/* hidden group-focus-within: */}
            <span className="hidden group-focus-within:flex absolute top-[100%] right-0 max-md:-right-[70%] max-w-[90svw] flex-col justify-center z-30 pr-4 animate-fadeIN">
              <span onClick={logInWithGoogle} className="my-1 p-2 max-[400px]:p-1 cursor-pointer z-40 flex flex-nowarp items-center whitespace-nowrap bg-white border-2 rounded-lg">
                <FcGoogle className="text-xl min-w-[30px] max-[300px]:min-w-[20px]" /> Sign in with Google
              </span>

              <span onClick={() => logIntoTestUser()} className="my-1 p-2 max-[400px]:p-1 cursor-pointer z-40 flex flex-nowarp items-center whitespace-nowrap bg-white border-2 rounded-lg">
                <VscVerifiedFilled className="text-xl min-w-[30px] max-[300px]:min-w-[20px] text-blue-600" /> Sign in with Test Account
              </span>

              <div className="flex flex-col p-1 my-1 rounded-lg bg-white">
                <p className=" ">- or -</p>
                {loginDetails?.err && <p className="text-red-400 text-start px-1">{loginDetails.err}</p> }
                <input
                  name="email"
                  type="text"
                  value={loginDetails.e}
                  onChange={(e) => {
                    setLoginDetails((prev) => ({ ...prev, e: e.target.value }));
                  }}
                  className=" px-2 py-1 my-1 border-2 rounded-lg"
                  placeholder="Email"
                />
                <input
                  name="password"
                  type="password"
                  value={loginDetails.p}
                  onChange={(e) => {
                    setLoginDetails((prev) => ({ ...prev, p: e.target.value }));
                  }}
                  className=" px-2 py-1 my-1 border-2 rounded-lg"
                  placeholder="Password"
                />
                <span onClick={handleSignInWithCredentials} className="text-sm px-2 py-1 my-1 rounded-lg ml-auto bg-orange-400">
                  Sign In
                </span>
              </div>
            </span>
          </button>

          <button className={`max-md:flex hidden px-2 py-1 group  cursor-pointer relative z-20`}>
            <span className="text-3xl h-[38px] font-[600] border-[1px] border-orange-400 group-focus:bg-orange-400 rounded-lg px-4 py-1 whitespace-nowrap flex flex-nowrap items-center">
              <IoMenu />
            </span>
            <span className="hidden group-focus:flex absolute top-[100%] bg-[#f5f5f5fa] rounded-b-lg right-0 w-[86svw] flex-col justify-center z-30 animate-fadeIN">
              <span className={` px-2 py-1 group  cursor-pointer relative z-20`}>
                <span className="font-[600] border-[1px] border-orange-400 rounded-lg px-4 py-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">Features</span>
              </span>

              <span className={`px-2 py-1 group  cursor-pointer relative z-20  rounded-b-lg`}>
                <span className="font-[600] border-[1px] border-orange-400 rounded-lg px-4 py-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">Pricing</span>
              </span>

              <span className={`mx-2 py-1 group  cursor-pointer relative z-20  rounded-lg bg-orange-400`}>
                <span className="font-[600] border-[1px] border-orange-400 rounded-lg px-4 py-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">Book Demo</span>
              </span>

              <span className={`px-2 py-1 group  cursor-pointer relative z-20`}>
                <span className="font-[600] border-[1px] border-orange-400 rounded-lg px-4 py-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">
                  Support
                  <FaChevronDown className="text-sm" />
                </span>
                <span className="ml-8 my-2 font-[600] border-[1px] border-orange-400 rounded-lg p-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">
                  <LuServerCog className="text-xl min-w-[50px] text-green-500" /> Training
                </span>
                <span className="ml-8 my-2 font-[600] border-[1px] border-orange-400 rounded-lg p-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">
                  <MdPhonelinkSetup className="text-xl min-w-[50px] text-purple-500" /> Setup
                </span>
                <span className="ml-8 my-2 font-[600] border-[1px] border-orange-400 rounded-lg p-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">
                  <SiSimpleanalytics className="text-xl min-w-[50px] text-yellow-500" /> Suggestion
                </span>
                <span className="ml-8 my-2 font-[600] border-[1px] border-orange-400 rounded-lg p-1 whitespace-nowrap flex flex-nowrap items-center gap-x-2">
                  <FaBlenderPhone className="text-xl min-w-[50px] text-blue-500" /> Contact
                </span>
              </span>
            </span>
          </button>
        </nav>

        <div className="w-full flex flex-col justify-center items-center mt-[150px]">
          <div className="w-full flex justify-center items-center mt-4 relative">
            <img src="./assets/ic.png" alt="Logo" className="h-auto w-[300px]" />
            <div className="hc top-0"></div>
            <div className="hc top-[55px] left-1/2 translate-x-[40px] "></div>
            <div className="hc top-[110px] "></div>
            <div className="hc top-[-60px] left-1/2 translate-x-[40px]"></div>
            <div className="hc top-[170px] left-1/2 translate-x-[40px]">
              <img src="./assets/ss2.png" alt="ss" className="h-[120px] w-[120px] scale-x-[.8] scale-y-[.7] translate-y-[-10px]" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0 50%)" }} />
            </div>
            <div className="hc top-0 left-1/2 translate-x-[140px]"></div>
            <div className="hc top-[110px] left-1/2 translate-x-[140px]">
              <img src="./assets/ss1.png" alt="ss" className="h-[120px] w-[120px] scale-x-[.8] scale-y-[.7] translate-y-[-10px]" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0 50%)" }} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center my-2 py-2 ">
            <h1 className="text-center text-[4rem] tracking-widest leading-[40px] text-[#181831] ff">Buzz</h1>
            <h1 className="text-center text-[2.4rem] tracking-widest leading-[40px] text-[#B74216]">
              <span>-</span>
              <span className="ff">BOOK</span>
              <span>-</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col w-full relative my-[10vh]">
          <div className="relative flex flex-wrap justify-center h-[210px]">
            <div className="relative flex basis-[120px]">
              <div className="hc top-0"></div>
              <div className="hc top-[55px] -left-1/2 -translate-x-[40px] "></div>
              <div className="hc top-[110px] relative"></div>
            </div>

            <div className="relative flex justify-center items-center h-full">
              <h1 className="text-3xl font-bold text-center">Why Choose Buzz Book?</h1>
            </div>
          </div>
        </div>

        <div className="flex max-[800px]:flex-col justify-between max-w-[1200px] mx-auto transition duration-500">
          <div className="basis-1/2 flex flex-col gap-y-8 px-4">
            <p className="max-w-[750px] text-lg font-bold">Elevate Your Business</p>
            <p className="font-[500]">Buzz Book represents an sophisticated and professional solution designed for the meticulous management of bookings across a diverse array of establishments, including but not limited to restaurants, bars, cafes, bistros, hotels, pubs, clubs, barbershops, nail salons, and similar service-oriented businesses. This platform acts as a stimulant to help these businesses not only meet but also exceed their customers expectations.</p>
            <p className="font-[500]">Buzz Book can effectively and precisely handle all of your needs, regardless of whether your goal is to expedite online reservations, optimise table turnover, improve phone booking operations, or organise events with ease.</p>
          </div>
          <div className="basis-1/2 rounded-xl mx-2 h-[500px] max-[800px]:mx-auto max-w-[50svw] max-[800px]:max-w-[80svw] aspect-square animate-fadeIN transition">
            {img === 1 && <img src={`./assets/ss${img}.png`} className="p-2 rounded-xl" alt="ss1" />}
            {img === 2 && <img src={`./assets/ss${img}.png`} className="p-2 rounded-xl" alt="ss2" />}
          </div>
        </div>

        <div className="flex flex-col w-full relative my-[10vh]">
          <div className="relative flex flex-wrap justify-center h-[210px] max-[283px]:flex-wrap-reverse">
            <div className="relative flex justify-center items-center h-full">
              <h1 className="text-3xl font-bold text-center">Easy to use</h1>
            </div>

            <div className="relative flex basis-[120px] h-[0px] ">
              <div className="hc top-0"></div>
              <div className="hc top-[55px] left-1/2 translate-x-[40px] "></div>
              <div className="hc top-[110px] "></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-2 px-2 max-w-[1200px] mx-auto relative text-center">
          <div className="flex flex-col border-2 rounded-lg p-1 items-center gap-2 min-w-[130px] bg-white">
            <GrCompliance className="my-2 text-5xl min-w-[50px]" />
            <h1 className="text-center text-lg font-bold">Proven Solutions </h1>
            <p className="font-[500]">Explore our catalog of solutions that have a proven track record and are tailored to meet your unique needs.</p>
          </div>
          <div className="flex flex-col border-2 rounded-lg p-1 items-center gap-2 min-w-[130px] bg-white">
            <IoPricetags className="my-2 text-5xl min-w-[50px]" />
            <h1 className="text-center text-lg font-bold">0% Commission</h1>
            <p className="font-[500]">Enjoy a commission-free experience, regardless of the number of bookings, with our fixed monthly subscription model.</p>
          </div>
          <div className="flex flex-col border-2 rounded-lg p-1 items-center gap-2 min-w-[130px] bg-white">
            <FaChargingStation className="my-2 text-5xl min-w-[50px]" />
            <h1 className="text-center text-lg font-bold"> Time-Saving Features </h1>
            <p className="font-[500]">Optimize your workflow with innovative features designed to save you time and effort.</p>
          </div>
          <div className="flex flex-col border-2 rounded-lg p-1 items-center gap-2 min-w-[130px] bg-white">
            <MdOutlineSupportAgent className="my-2 text-5xl min-w-[50px]" />
            <h1 className="text-center text-lg font-bold">Reduced no-shows</h1>
            <p className="font-[500]">Minimize no-shows and boost reservations, ensuring the success of your events during busy periods.</p>
          </div>
        </div>

        <div className="flex flex-col w-full relative mt-[10vh] bg-orange-400 ">
          <div className="relative flex flex-wrap justify-center h-[210px] pt-4">
            <div className="relative flex basis-[120px]">
              <div className="hc-no-bg bg-gradient-to-br from-white via-transparent to-white top-0"></div>
              <div className="hc-no-bg bg-gradient-to-br from-white via-transparent to-white top-[55px] -left-1/2 -translate-x-[40px] "></div>
              <div className="hc-no-bg bg-gradient-to-br from-white via-transparent to-white top-[110px] "></div>
            </div>

            <div className="relative flex justify-center items-center h-full">
              <h1 className="text-3xl font-bold text-center ">Get Started with Buzz Book Today!</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center relative mb-[10vh] pb-[10svh] pt-[5svh] bg-orange-400 z-[-1] -translate-y-2">
          <div className="flex flex-col w-[9C0svw] max-w-[1200px]">
            <p className="max-w-[750px] px-[5svw] text-lg font-[700]">Experience the future of business management.</p>
            <p className="max-w-[750px] px-[5svw] text-lg font-[500]">Book a demo now and discover how Buzz Book can transform your business.</p>
            <p className="cursor-pointer ml-auto mr-[10svw] text-end text-lg p-2 text-white rounded-lg font-bold border-2 border-white">Join Buzz Book. Book Demo!</p>
          </div>
        </div>

        <div className="flex flex-col w-full relative my-[10vh]">
          <div className="relative flex flex-wrap justify-center h-[210px] max-[334px]:flex-wrap-reverse">
            <div className="relative flex justify-center items-center h-full">
              <h1 className="text-xl font-bold text-center">The support you need</h1>
            </div>

            <div className="relative flex basis-[120px] h-[0px] ">
              <div className="hc top-0"></div>
              <div className="hc top-[55px] left-1/2 translate-x-[40px] "></div>
              <div className="hc top-[110px] "></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-center max-w-[700px] mx-auto font-[600]">
          <p>With Buzz Book, you&apos;re never alone. Benefit from round-the-clock support plans, personalized onboarding, and unlimited training and coaching.</p>
          <div className="max-w-[300px] mx-auto">
            <svg className="w-[100%]" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 511.999 511.999">
              <path
                d="M503.665 66.8v316.343c0 17.909-14.509 32.429-32.417 32.429H40.754c-17.909 0-32.418-14.52-32.418-32.429V66.8c0-17.909 14.509-32.429 32.418-32.429h430.493c17.908 0 32.418 14.52 32.418 32.429z"
                style={{
                  fill: "#ccd8e5",
                }}
              />
              <path
                d="M503.665 66.8v316.343c0 17.909-14.509 32.429-32.417 32.429H183.344l23.752-57.925L339.655 34.371h131.592c17.908 0 32.418 14.52 32.418 32.429z"
                style={{
                  fill: "#dfeaf4",
                }}
              />
              <path
                d="M503.665 66.8v290.847H8.337V66.8c0-17.909 14.509-32.429 32.418-32.429h430.493c17.907 0 32.417 14.52 32.417 32.429z"
                style={{
                  fill: "#fff3eb",
                }}
              />
              <path
                d="M503.665 66.8v290.847H207.097L339.655 34.371h131.592c17.908 0 32.418 14.52 32.418 32.429z"
                style={{
                  fill: "#f7f8f8",
                }}
              />
              <path
                d="M343.454 480.173H168.547l12.487-29.218 15.131-35.384h119.671l15.131 35.384z"
                style={{
                  fill: "#ccd8e5",
                }}
              />
              <path
                d="M330.967 450.955H181.034l15.131-35.384h119.671z"
                style={{
                  fill: "#bac6d1",
                }}
              />
              <path
                d="M318.631 196.322c0 34.151-27.685 61.835-61.835 61.835-.544 0-1.089-.011-1.633-.022-33.406-.867-60.213-28.207-60.213-61.813 0-34.162 27.685-61.847 61.847-61.847 16.331 0 31.173 6.332 42.227 16.675 12.064 11.277 19.607 27.341 19.607 45.172z"
                style={{
                  fill: "#efd9a8",
                }}
              />
              <path
                d="M224.946 196.319c0-28.981 19.939-53.298 46.845-60.001a61.986 61.986 0 0 0-14.998-1.841c-34.155 0-61.843 27.688-61.843 61.843s27.688 61.843 61.843 61.843c5.174 0 10.195-.644 14.998-1.841-26.906-6.707-46.845-31.022-46.845-60.003z"
                style={{
                  fill: "#ddc697",
                }}
              />
              <path
                d="M194.949 154.47c-23.112 0-41.848 18.736-41.848 41.848s18.736 41.848 41.848 41.848V154.47zM318.636 154.47c23.112 0 41.848 18.736 41.848 41.848s-18.736 41.848-41.848 41.848V154.47z"
                style={{
                  fill: "#23475b",
                }}
              />
              <path
                d="M318.631 320.004H194.949c0-33.595 26.796-60.947 60.191-61.824.555-.011 1.1-.022 1.655-.022 34.152-.001 61.836 27.695 61.836 61.846z"
                style={{
                  fill: "#df7716",
                }}
              />
              <path
                d="M270.125 259.618a62.022 62.022 0 0 0-13.331-1.456c-34.155 0-61.843 27.688-61.843 61.843h26.663c-.001-29.577 20.766-54.289 48.511-60.387z"
                style={{
                  fill: "#df7716",
                }}
              />
              <path d="M310.825 239.768c1.173 3.182 4.223 5.455 7.811 5.455 27.669 0 50.179-22.511 50.179-50.18 0-17.784-9.308-33.425-23.299-42.339-16.281-34.076-50.809-55.956-88.723-55.956-37.91 0-72.437 21.878-88.72 55.952-13.996 8.914-23.307 24.558-23.307 42.345 0 27.669 22.511 50.18 50.179 50.18 3.589 0 6.639-2.274 7.811-5.456a70.669 70.669 0 0 0 20.904 17.119c-22.031 11.851-37.046 35.124-37.046 61.843a8.332 8.332 0 0 0 16.664 0c0-29.507 24.004-53.511 53.511-53.511s53.511 24.004 53.511 53.511a8.332 8.332 0 0 0 16.664 0c0-26.719-15.014-49.993-37.046-61.843a70.664 70.664 0 0 0 20.907-17.12zm16.143-12.257v-64.936c14.463 3.714 25.183 16.862 25.183 32.467.001 15.606-10.72 28.755-25.183 32.469zM256.795 113.41c25.514 0 49.182 11.936 64.44 31.519a50.933 50.933 0 0 0-2.599-.067c-3.588 0-6.638 2.273-7.811 5.455-12.883-15.536-32.32-25.45-54.032-25.45s-41.151 9.914-54.033 25.451c-1.172-3.182-4.223-5.456-7.811-5.456-.87 0-1.734.023-2.593.067 15.259-19.583 38.926-31.519 64.439-31.519zm-70.179 114.101c-14.463-3.714-25.183-16.862-25.183-32.469 0-15.605 10.721-28.754 25.183-32.467v64.936zm70.177 21.041c-15.593 0-29.647-6.708-39.435-17.385h23.884a8.332 8.332 0 0 0 0-16.664h-34.281a53.209 53.209 0 0 1-3.679-19.462c0-29.506 24.004-53.511 53.511-53.511s53.511 24.004 53.511 53.511-24.005 53.511-53.511 53.511z" />
              <path d="M471.246 24.766H40.754C18.283 24.766 0 43.049 0 65.52v59.227a8.332 8.332 0 0 0 16.664 0V65.52c0-13.284 10.807-24.09 24.09-24.09h430.492c13.284 0 24.09 10.807 24.09 24.09v284.411h-52.21a8.332 8.332 0 0 0 0 16.664h52.21v15.273c0 13.284-10.807 24.09-24.09 24.09H40.754c-13.284 0-24.09-10.807-24.09-24.09v-15.273h398.688a8.332 8.332 0 0 0 0-16.664H16.664V152.522a8.332 8.332 0 0 0-16.664 0V381.87c0 22.472 18.283 40.754 40.754 40.754H183.54l-20.494 47.945h-40.034a8.332 8.332 0 0 0 0 16.664h265.975a8.332 8.332 0 0 0 0-16.664h-40.034l-20.494-47.945h142.786c22.472 0 40.754-18.282 40.754-40.754V65.52c.001-22.471-18.282-40.754-40.753-40.754zM330.83 470.568H181.17l14.238-33.31h121.185l14.237 33.31z" />
              <path d="M253.972 376.221c-3.517.879-6.116 4.048-6.291 7.67-.364 7.534 9.106 11.629 14.33 6.172 2.663-2.782 3.078-7.177.913-10.385-1.914-2.906-5.583-4.299-8.952-3.457z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col w-full relative my-[10vh]">
          <div className="relative flex flex-wrap justify-center h-[210px]">
            <div className="relative flex basis-[120px]">
              <div className="hc top-0"></div>
              <div className="hc top-[55px] -left-1/2 -translate-x-[40px] "></div>
              <div className="hc top-[110px] "></div>
            </div>

            <div className="relative flex justify-center items-center h-full">
              <h1 className="text-xl font-bold text-center">Frequently Asked Questions</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col max-w-[900px] mx-auto w-[80%]">
          <details className="p-2 border-2 rounded-lg cursor-pointer bg-white">
            <summary className="transition animate-fadeIN font-[700]">What is BuzzBook?</summary>
            <p className="transition animate-fadeIN font-[500] my-2 px-4">BuzzBook is an advanced platform designed for the effective management of reservations and table settings in a diverse range of establishments, including restaurants, bars, cafes, bistros, hotels, pubs, clubs, barbershops, nail salons, and various service-oriented businesses. Tailored to exceed the expectations of patrons, BuzzBook is a professional solution crafted to elevate the operational efficiency of businesses within the hospitality industry.</p>
          </details>
          <details className="p-2 border-2 rounded-lg cursor-pointer bg-white">
            <summary className="transition animate-fadeIN font-[700]">What services does BuzzBook offer?</summary>
            <p className="transition animate-fadeIN font-[500] my-2 px-4">BuzzBook is a comprehensive solution that caters to various needs, including online bookings, streamlined phone booking automation, efficient table turnover management, and seamless event coordination. Whether you aim to accept bookings online, enhance table profitability, manage events effortlessly, automate phone bookings, offer vouchers, or accept online payments, BuzzBook provides a comprehensive suite of tools to address these requirements.</p>
          </details>
          <details className="p-2 border-2 rounded-lg cursor-pointer bg-white">
            <summary className="transition animate-fadeIN font-[700]">Does BuzzBook charge commissions on bookings?</summary>
            <p className="transition animate-fadeIN font-[500] my-2 px-4">No, BuzzBook operates on a commission-free model. Regardless of where the booking is made, be it through your website, social media channels, Reserve with Google, you won&apos;t incur any commission fees.</p>
          </details>
          <details className="p-2 border-2 rounded-lg cursor-pointer bg-white">
            <summary className="transition animate-fadeIN font-[700]">What integrations does BuzzBook offer?</summary>
            <p className="transition animate-fadeIN font-[500] my-2 px-4">BuzzBook collaborates with a myriad of global technology businesses to enhance venue efficiency. Whether you need integrations with your POS, marketing communications, PMS, or complimentary booking partners, BuzzBook can support your venue&apos;s specific needs.</p>
          </details>
          <details className="p-2 border-2 rounded-lg cursor-pointer bg-white">
            <summary className="transition animate-fadeIN font-[700]">What plans does BuzzBook offer, and how do they differ?</summary>
            <p className="transition animate-fadeIN font-[500] my-2 px-4">BuzzBook provides a range of plans to suit the needs of every venue, including Starter, Pro, Hive. Each plan offers core features with variations in the number of bookings. Additionally, BuzzBook Lite is a simplified version designed for venues transitioning from traditional &apos;paper&apos; diaries to digitizing records and accepting online bookings.</p>
          </details>
          <details className="p-2 border-2 rounded-lg cursor-pointer bg-white">
            <summary className="transition animate-fadeIN font-[700]">Who owns the customer&apos;s data in BuzzBook?</summary>
            <p className="transition animate-fadeIN font-[500] my-2 px-4">As the venue, you are the controller of the customer&apos;s data in BuzzBook. BuzzBook acts as the processor, carrying out processing under your instructions. Anonymized data may be used by BuzzBook to analyze booking trends and user behavior for product enhancements, always prioritizing the venue&apos;s data control.</p>
          </details>
          <details className="p-2 border-2 rounded-lg cursor-pointer bg-white">
            <summary className="transition animate-fadeIN font-[700]">Is BuzzBook available globally?</summary>
            <p className="transition animate-fadeIN font-[500] my-2 px-4">Yes, BuzzBook is available worldwide, operating across various countries with regional teams situated in strategic locations.</p>
          </details>
          <details className="p-2 border-2 rounded-lg cursor-pointer bg-white">
            <summary className="transition animate-fadeIN font-[700]">Does BuzzBook provide customer support?</summary>
            <p className="transition animate-fadeIN font-[500] my-2 px-4">Absolutely. BuzzBook offers dedicated local support from hospitality tech professionals to assist venues with their specific needs. For more information, you can connect with the local support team through the BuzzBook Customer Hub.</p>
          </details>
          <details className="p-2 border-2 rounded-lg cursor-pointer bg-white">
            <summary className="transition animate-fadeIN font-[700]">Can I see BuzzBook in action?</summary>
            <p className="transition animate-fadeIN font-[500] my-2 px-4">Certainly! Book a demo with BuzzBook to witness how it seamlessly brings together reservation management and enhances the efficiency of your busy venue. Let&apos;s explore the possibilities together.</p>
          </details>
        </div>

        <footer className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 justify-items-center max-sm:justify-items-start py-[10vh] mt-4 bg-orange-500" style={{ clipPath: "polygon(0 18%, 6% 18%, 12% 0, 18% 0, 24% 18%, 30% 18%, 36% 0, 42% 0, 48% 18%, 54% 18%, 60% 0, 66% 0, 72% 18%, 78% 18%, 83% 0, 89% 0, 94% 18%, 100% 18%, 100% 100%, 0 100%)" }}>
          <ul className="px-2">
            <li className="font-[600] border-b border-yellow-400">Features</li>
            <li>
              <div className="hc top-0"></div>Setup
            </li>
            <li>Ordering</li>
            <li>Integrations</li>
          </ul>
          <ul className="px-2">
            <li className="font-[600] border-b border-yellow-400">Businesses</li>
            <li>Restaurants</li>
            <li>Pubs and Clubs</li>
            <li>Salons and Barber Shops</li>
          </ul>
          <ul className="px-2">
            <li className="font-[600] border-b border-yellow-400">Resources</li>
            <li>Customer Hub</li>
            <li>Blog</li>
            <li>FAQs</li>
          </ul>
          <ul className="px-2">
            <li className="font-[600] border-b border-yellow-400">Company</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Careers</li>
          </ul>
        </footer>

        <div className="bg-orange-500 text-center flex gap-2 flex-wrap px-[10svw] text-3xl">
          <TiSocialFacebookCircular />
          <TiSocialYoutube />
          <TiSocialLinkedin />
          <RiTwitterXFill />
        </div>

        <div className="bg-orange-500 text-center">BuzzBook {new Date().getFullYear()} @ Mihai Culea</div>
      </div>
    </>
  );
}

function hcPattern() {
  return (
    <div className="absolute">
      <div className="cursor"></div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>

      <div className="row row-moved">
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
        <div className="hexagon"></div>
      </div>
    </div>
  );
}
import { TiSocialFacebookCircular } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { RiTwitterXFill } from "react-icons/ri";
import { GiFlexibleStar } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { FaBlenderPhone, FaChevronDown } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { AiFillSignal } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";
import { MdPhonelinkSetup } from "react-icons/md";
import { LuServerCog } from "react-icons/lu";
import { IoPricetags } from "react-icons/io5";
import { GrCompliance } from "react-icons/gr";
import { FaChargingStation } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
