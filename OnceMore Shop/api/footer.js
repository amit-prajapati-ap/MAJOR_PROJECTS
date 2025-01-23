const footer = `
            <!-- Footer Section -->
             <section class="bg-gray-800 text-lightGray mt-[200px]">
                <div class="maxContainer pb-10 pt-32 flex md:flex-row flex-col items-center gap-6">

                    <ul class="flex flex-col gap-6 md:w-[40%]">
                        <li class="w-[300px]">
                            <div>
                                <a href="index.html">
                                    <img src="assets/text_logo.png" alt="OnceMore Shop" width="150px" class="logo">
                                </a>
                            </div>
                        </li>
                        <li class="w-full">
                            <p>Welcome to OnceMore Shop, your ultimate destination for shopping experience!</p>
                        </li>
                        <li class="w-[140px]">
                            <ul class="flex gap-1 justify-between">
                                <li class="cursor-pointer">
                                    <img src="assets/facebook-icon-2b65a866.svg">
                                </li>
                                <li class="cursor-pointer">
                                    <img src="assets/twitter-icon-82cbd3e5.svg">
                                </li>
                                <li class="cursor-pointer">
                                    <img src="assets/github-icon-e2d5f6a2.svg" class="invert">
                                </li>
                                <li class="cursor-pointer">
                                    <img src="assets/instagram-icon-6c2b0c16.svg">
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div class="md:flex justify-between sm:flex-row grid grid-cols-2 gap-8 md:w-[60%]">

                        <ul class="flex flex-col gap-4">
                            <li class="font-bold text-lg">SHOPPING</li>
                            <li class="opacity-80 cursor-pointer hover:text-lightBlue500 transition-all duration-300">Computer Store</li>
                            <li class="opacity-80 cursor-pointer hover:text-lightBlue500 transition-all duration-300">Laptop Store</li>
                            <li class="opacity-80 cursor-pointer hover:text-lightBlue500 transition-all duration-300">Accessories</li>
                            <li class="opacity-80 cursor-pointer hover:text-lightBlue500 transition-all duration-300">Sales & Discount</li>
                        </ul>

                        <ul class="flex flex-col gap-4">
                            <li class="font-bold text-lg">EXPERIENCE</li>
                            <li class="opacity-80 cursor-pointer hover:text-lightBlue500 transition-all duration-300">Contact Us</li>
                            <li class="opacity-80 cursor-pointer hover:text-lightBlue500 transition-all duration-300">Payment Method</li>
                            <li class="opacity-80 cursor-pointer hover:text-lightBlue500 transition-all duration-300">Delivery</li>
                            <li class="opacity-80 cursor-pointer hover:text-lightBlue500 transition-all duration-300">Return and Exchange</li>
                        </ul>

                        <ul class="flex flex-col gap-4 w-full sm:w-[35%]">
                            <li class="font-bold text-lg">NEWSLETTER</li>
                            <li class="opacity-80 w-[70vw] md:w-full">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, omnis?</p>
                            </li>
                            <li class="flex flex-row md:flex-col xl:flex-row gap-2 xl:gap-4">
                                <input type="email" id="email" placeholder="Your Email"
                                    class="rounded-md bg-gray-900 px-3 py-2 w-[170px] outline-none">
                                <div class="py-2 px-8 md:px-4 bg-lightBlue500 text-white rounded-md w-[150px] hover:bg-blue-700 transition-all duration-300">
                                    <button id="emailbtn" class="flex justify-center items-center gap-1">Submit</button>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </section>
`;

let footerSection = document.querySelector(".footerSection");
footerSection.innerHTML += footer;