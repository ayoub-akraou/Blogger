import React from "react";
import Button from "../components/UI/Button/Button";

export default function Profile({
  classNameName,
  name = "Ayoub Akraou",
  email = "Mehrabbozorgi.business@gmail.com",
  password = "password123",
  image = "/images/avatar.png",
  bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
}) {
  return (
    <div className={`${classNameName} max-w-3xl mx-auto px-6 pt-32 pb-20`}>
      {/* <!-- Header with profile image --> */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welecom {name}!</h1>
        <div className="h-24 w-24 rounded-full overflow-hidden">
          <img
            src={image}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* <!-- Form --> */}
      <form>
        {/* <!-- Full Name --> */}
        <div>
          <label for="fullname" className="block text-lg font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={name}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* <!-- Email --> */}
        <div className="mb-6">
          <label for="email" className="block text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* <!-- Password --> */}
        <div className="mb-6">
          <label for="password" className="block text-lg font-medium mb-2">
            Password
          </label>
          <input
            type="text"
            id="password"
            value={password}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* <!-- Confirm Password --> */}
        <div className="mb-6">
          <label
            for="confirmPassword"
            className="block text-lg font-medium mb-2"
          >
            Confirm-password
          </label>
          <input
            type="text"
            id="confirmPassword"
            value={password}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* <!-- Bio --> */}
        <div className="mb-8">
          <label for="bio" className="block text-lg font-medium mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            className="w-full p-3 border border-gray-300 rounded-md min-h-[200px]"
          >
            {bio}
          </textarea>
        </div>

        {/* <!-- Buttons --> */}
        <div className="flex justify-between pt-4">
          <Button
            type="Button"
            className="border border-primary !text-primary bg-white hover:bg-gray-50"
          >
            Cancel
          </Button>

          <div className="space-x-4">
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-secondary"
            >
              Save
            </Button>

            <Button
              type="Button"
              className=" bg-primary text-white hover:bg-secondary"
            >
              Activer Mode Auteur
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
