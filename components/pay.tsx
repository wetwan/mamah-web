// import React, { useState, useMemo, useCallback, useEffect } from "react";
// // Mock icons from Lucide-React
// import { ShoppingCart, Check, Loader2, CreditCard, DollarSign, LogIn, XCircle, Clock } from 'lucide-react';

// // ===============================================
// // 1. MOCK TYPES & GLOBAL UTILITIES (Outside component scope)
// // ===============================================

// const MOCK_API_DELAY = 1500;
// const MOCK_PAYMENT_DELAY = 2000;

// let mockCartData = [
//     {
//         id: "p1_sL_cBlack",
//         product: { _id: "prod1", name: "Premium Soft-Blend Hoodie", finalPrice: 45.00, images: [] },
//         quantity: 2,
//         selectedSize: "L",
//         selectedColor: { name: "Black" },
//     },
//     {
//         id: "p2_sM_cBlue",
//         product: { _id: "prod2", name: "Vintage High-Rise Denim", finalPrice: 89.99, images: [] },
//         quantity: 1,
//         selectedSize: "M",
//         selectedColor: { name: "Blue" },
//     },
// ];
// let authToken = "mock-jwt-token-12345";

// // ===============================================
// // 2. MOCK HOOKS (Replacing External Next.js/TanStack/Store dependencies)
// // ===============================================

// const useCart = () => {
//     const resetCart = () => {
//         mockCartData = [];
//         console.log("🛒 Cart has been reset.");
//         // Force re-render of components using this mock hook
//         window.dispatchEvent(new Event('mockCartUpdate')); 
//     };
//     // Use an effect to simulate reactivity
//     const [cartItems, setCartItems] = useState(mockCartData);
//     React.useEffect(() => {
//         const handler = () => setCartItems(mockCartData);
//         window.addEventListener('mockCartUpdate', handler);
//         return () => window.removeEventListener('mockCartUpdate', handler);
//     }, []);

//     return {
//         item: cartItems,
//         resetCart: resetCart,
//     };
// };

// const useAuth = () => {
//     return {
//         token: authToken,
//         isLoggedIn: !!authToken,
//     };
// };

// const mockUseForm = () => {
//     const [formData, setFormData] = useState({
//         country: "USA", firstName: "Jane", lastName: "Doe", address1: "123 Mock St", address2: "",
//         state: "CA", poster: "90210", email: "jane@example.com", phone: "555-123-4567",
//         password: "",
//     });

//     const register = (name) => ({
//         name,
//         value: formData[name] || '', // Ensure controlled input with default empty string
//         onChange: (e) => setFormData(prev => ({ ...prev, [name]: e.target.value })),
//     });

//     const handleSubmit = (onSubmit) => (e) => {
//         e.preventDefault();
//         // Basic required field check simulation
//         const requiredFields = ["country", "firstName", "lastName", "address1", "state", "email", "phone"];
//         const hasMissingField = requiredFields.some(field => !formData[field]);

//         if (hasMissingField) {
//             console.error("Missing required fields in form!");
//             alert("Please fill in all required fields marked with *.");
//             return;
//         }
//         onSubmit(formData);
//     };

//     return {
//         register,
//         handleSubmit,
//         watch: formData,
//         formState: { errors: {} },
//     };
// };

// const mockCreateOrder = (order, token) => {
//     console.log("Simulating API call with:", order);
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (order.paymentMethod === 'cash_on_delivery') {
//                 // Cash on Delivery Success
//                 resolve({ success: true, orderId: "ORD-MOCK-001" });
//             } else if (order.paymentMethod === 'card') {
//                 // For demonstration, a successful payment via the mock form should bypass this
//                 // If this is called directly with 'card' it means the payment failed or was skipped
//                 reject({ response: { data: { message: "Card payment was not completed successfully via the mock form." } } });
//             } else {
//                 reject(new Error("Generic order placement error."));
//             }
//         }, MOCK_API_DELAY);
//     });
// };

// const mockUseMutation = (options) => {
//     const [isPending, setIsPending] = useState(false);

//     const mutate = async (variables) => {
//         setIsPending(true);
//         try {
//             const data = await options.mutationFn(variables.order, variables.token);
//             setIsPending(false);
//             options.onSuccess(data);
//         } catch (error) {
//             setIsPending(false);
//             options.onError(error);
//         }
//     };

//     return { mutate, isPending };
// };

// const mockUseRouter = () => ({
//     push: (path) => console.log(`[Router Mock] Navigating to: ${path}`),
// });


// // ===============================================
// // 3. MOCK UI COMPONENTS
// // ===============================================

// const Returing = () => (
//     <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 mb-8 rounded-lg shadow-inner">
//         <p className="font-semibold text-sm">
//             <LogIn className="inline w-4 h-4 mr-2" />
//             Returning customer? <a href="#" className="text-blue-600 hover:underline font-bold">Click here to login</a> (Mock Link)
//         </p>
//     </div>
// );

// const Checkbox = ({ checked, onClick, label }) => (
//     <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
//         <div
//             className={`w-5 h-5 border-2 rounded transition-colors duration-200 flex items-center justify-center ${checked ? 'bg-[#7971ea] border-[#7971ea]' : 'bg-gray-200 border-gray-300'}`}
//         >
//             {checked && <Check className="text-white w-4 h-4" />}
//         </div>
//         <p className="font-light text-gray-700 select-none">{label}</p>
//     </div>
// );

// // Mock of the shared Button component
// const Button = React.forwardRef(({ children, type = 'button', disabled, className = '', ...props }, ref) => {
//     return (
//         <button
//             ref={ref}
//             type={type}
//             disabled={disabled}
//             className={`
//                 flex items-center justify-center space-x-2
//                 px-6 py-4 rounded-lg transition-all duration-300 ease-in-out
//                 font-bold text-lg leading-none shadow-lg
//                 ${className}
//                 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-opacity-90 active:scale-[0.99]'}
//             `}
//             {...props}
//         >
//             {disabled && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
//             {children}
//         </button>
//     );
// });
// Button.displayName = 'Button';

// // ===============================================
// // 4. MOCK STRIPE CHECKOUT FORM
// // ===============================================

// /**
//  * @typedef {object} MockFormProps
//  * @property {() => void} onPaymentSuccess - Called when mock payment succeeds.
//  * @property {number} total - The total amount to display.
//  */

// /**
//  * Mock component simulating Stripe's Payment Element.
//  * @param {MockFormProps} props
//  */
// const MockStripeCheckoutForm = ({ onPaymentSuccess, total }) => {
//     const [status, setStatus] = useState('initial'); // initial, processing, succeeded, failed
//     const [cardError, setCardError] = useState('');
//     const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

//     const isProcessing = status === 'processing';
//     const isDisabled = isProcessing || status === 'succeeded' || cardDetails.number.length < 16;

//     // Simulate Payment confirmation (Stripe.js confirmPayment)
//     const handleConfirmPayment = (e) => {
//         e.preventDefault();
//         setCardError('');

//         if (cardDetails.number.startsWith('4') && cardDetails.number.length === 16) {
//             // Simulate successful payment (e.g., Visa card)
//             setStatus('processing');
//             console.log("Initiating Mock Payment...");

//             setTimeout(() => {
//                 setStatus('succeeded');
//                 onPaymentSuccess(); // Triggers the final order placement
//             }, MOCK_PAYMENT_DELAY);

//         } else if (cardDetails.number.startsWith('5') && cardDetails.number.length === 16) {
//             // Simulate failed payment (e.g., Mastercard failure)
//             setStatus('processing');
//             console.log("Simulating Payment Failure...");
//             setTimeout(() => {
//                 setStatus('failed');
//                 setCardError('Payment failed: Invalid card details or insufficient funds. Please try Cash on Delivery.');
//             }, MOCK_PAYMENT_DELAY);
//         } else {
//             setCardError('Please enter a 16-digit card number (starts with 4 for success, 5 for failure).');
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCardDetails(prev => ({ ...prev, [name]: value }));
//     };

//     return (
//         <form onSubmit={handleConfirmPayment} className="space-y-4 pt-4">
//             <h3 className="text-xl font-semibold text-gray-800">Card Payment Details</h3>

//             {/* Simulated Payment Element (Card Number) */}
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Card Number (Mock)</label>
//                 <input
//                     type="text"
//                     name="number"
//                     value={cardDetails.number}
//                     onChange={handleInputChange}
//                     maxLength={16}
//                     className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-[#7971ea] focus:border-[#7971ea] transition"
//                     placeholder="4XXX XXXX XXXX XXXX (4 for success, 5 for failure)"
//                     disabled={isProcessing}
//                 />
//             </div>
            
//             <div className="flex space-x-4">
//                 <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
//                     <input
//                         type="text"
//                         name="expiry"
//                         value={cardDetails.expiry}
//                         onChange={handleInputChange}
//                         maxLength={5}
//                         className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-[#7971ea] focus:border-[#7971ea] transition"
//                         placeholder="MM/YY"
//                         disabled={isProcessing}
//                     />
//                 </div>
//                 <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
//                     <input
//                         type="text"
//                         name="cvc"
//                         value={cardDetails.cvc}
//                         onChange={handleInputChange}
//                         maxLength={3}
//                         className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-[#7971ea] focus:border-[#7971ea] transition"
//                         placeholder="CVC"
//                         disabled={isProcessing}
//                     />
//                 </div>
//             </div>

//             {cardError && (
//                 <div className="text-red-600 text-sm font-medium flex items-center">
//                     <XCircle className="w-4 h-4 mr-2" /> {cardError}
//                 </div>
//             )}

//             <Button
//                 type="submit"
//                 disabled={isDisabled}
//                 className={`w-full mt-4 text-white ${status === 'succeeded' ? 'bg-green-600' : 'bg-[#7971ea] hover:bg-[#6c64d3]'}`}
//             >
//                 {status === 'processing' ? (
//                     <>
//                         <Loader2 className="h-5 w-5 animate-spin mr-2" /> Confirming Payment...
//                     </>
//                 ) : status === 'succeeded' ? (
//                     <>
//                         <Check className="h-5 w-5 mr-2" /> Payment Confirmed
//                     </>
//                 ) : (
//                     `Pay ₦${total.toFixed(2)} Now`
//                 )}
//             </Button>
//             <p className="text-xs text-center text-gray-500 mt-2 flex items-center justify-center">
//                 <Clock className="w-3 h-3 mr-1" /> Payments are processed securely.
//             </p>
//         </form>
//     );
// };


// // ===============================================
// // 5. CHECKOUT DETAILS COMPONENT (Refactored)
// // ===============================================

// /**
//  * @typedef {object} Prop
//  * @property {"cash_on_delivery" | "card"} option
//  * @property {CartItem[]} cartProducts
//  * @property {React.Dispatch<React.SetStateAction<"cash_on_delivery" | "card">>} setOption
//  * @property {number} subtotal
//  * @property {number} [delivery=10]
//  * @property {number} total
//  * @property {() => void} onCardPaymentSuccess - Callback to finalize order after mock payment.
//  */

// /**
//  * @param {Prop} props
//  */
// const CheckoutDetails = ({
//     option,
//     cartProducts,
//     setOption,
//     subtotal,
//     total,
//     onCardPaymentSuccess
// }) => {
//     // State to simulate fetching the client secret (Stripe initialization)
//     const [clientSecretStatus, setClientSecretStatus] = useState('initial'); 

//     useEffect(() => {
//         if (option === 'card' && clientSecretStatus === 'initial') {
//             setClientSecretStatus('loading');
//             // Simulate the API call to get client secret
//             const timeout = setTimeout(() => {
//                 setClientSecretStatus('ready');
//             }, 1000); // 1 second mock load time
//             return () => clearTimeout(timeout);
//         }
//     }, [option, clientSecretStatus]);

//     return (
//         <div className="w-full sticky top-4">
//             {/* Coupon Section */}
//             <h2 className="my-3 capitalize font-medium text-2xl text-gray-800">Coupon Code</h2>
//             <div className="border border-gray-300 rounded-xl px-3 py-5 md:px-6 bg-white shadow-lg mb-8">
//                 <p className="font-light text-gray-600 mb-4">
//                     Enter your coupon code if you have one
//                 </p>
//                 <div className="flex w-full border mt-6 h-14 rounded-xl overflow-hidden">
//                     <input
//                         type="text"
//                         placeholder="Coupon Code"
//                         className="placeholder:capitalize border-0 w-[65%] h-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:ring-offset-2 transition duration-200"
//                     />
//                     <button className="capitalize w-[35%] h-full bg-[#7971ea] text-white font-bold text-sm hover:bg-[#6c64d3] transition duration-200">
//                         Check Coupon
//                     </button>
//                 </div>
//             </div>

//             {/* Order Summary */}
//             <h2 className="my-3 mt-7 capitalize font-medium text-2xl text-gray-800">Your Order</h2>
//             <div className="border border-gray-300 rounded-xl px-4 py-6 md:px-8 bg-white shadow-xl">
//                 <div className="capitalize">
//                     <div className="flex items-start justify-between mb-4 border-b pb-3">
//                         <p className="font-bold text-gray-700">Products</p>
//                         <p className="font-bold text-gray-700">Total</p>
//                     </div>

//                     {cartProducts.length === 0 ? (
//                          <p className="text-center text-red-500 py-4">Your cart is empty.</p>
//                     ) : (
//                         cartProducts.map((item) => (
//                             <div
//                                 className="border-b border-gray-100 mb-3 pb-2 flex justify-between text-gray-600 text-sm"
//                                 key={item.id}
//                             >
//                                 <p className="truncate max-w-[70%]">
//                                     {item.product.name} × {item.quantity}
//                                 </p>
//                                 <p className="font-medium">₦{(item.product.finalPrice * item.quantity).toFixed(2)}</p>
//                             </div>
//                         ))
//                     )}

//                     <div className="flex justify-between border-b border-gray-200 pt-3 pb-3 text-lg font-semibold text-gray-800">
//                         <p>Cart Subtotal</p>
//                         <p>₦{subtotal.toFixed(2)}</p>
//                     </div>

//                     <div className="flex justify-between mt-4 text-2xl font-extrabold text-[#7971ea]">
//                         <p>Order Total</p>
//                         <p>₦{total.toFixed(2)}</p>
//                     </div>
//                 </div>

//                 {/* Payment Options */}
//                 <div className="mt-8">
//                     <div
//                         className={`border rounded-lg mb-4 w-full capitalize py-3 px-4 cursor-pointer transition-all duration-200 flex items-center justify-between ${
//                             option === "cash_on_delivery" ? "bg-[#7971ea] border-[#7971ea] text-white shadow-md" : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                         }`}
//                         onClick={() => setOption("cash_on_delivery")}
//                     >
//                         <span className="font-semibold flex items-center">
//                             <DollarSign className={`w-5 h-5 mr-3 ${option === "cash_on_delivery" ? "text-white" : "text-green-600"}`} />
//                             Payment on Delivery
//                         </span>
//                         {option === "cash_on_delivery" && <Check className="w-5 h-5" />}
//                     </div>

//                     <div
//                         className={`border rounded-lg mb-4 w-full capitalize py-3 px-4 cursor-pointer transition-all duration-200 flex items-center justify-between ${
//                             option === "card" ? "bg-[#7971ea] border-[#7971ea] text-white shadow-md" : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                         }`}
//                         onClick={() => setOption("card")}
//                     >
//                         <span className="font-semibold flex items-center">
//                             <CreditCard className={`w-5 h-5 mr-3 ${option === "card" ? "text-white" : "text-red-500"}`} />
//                             Pay with Card
//                         </span>
//                         {option === "card" && <Check className="w-5 h-5" />}
//                     </div>
                    
//                     {/* Mock Card Payment Form Integration */}
//                     {option === "card" && (
//                         <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
//                             {clientSecretStatus === 'loading' ? (
//                                 <div className="text-center p-6 text-gray-600 flex flex-col items-center">
//                                     <Loader2 className="h-6 w-6 animate-spin mb-3 text-[#7971ea]" />
//                                     Loading payment form...
//                                 </div>
//                             ) : (
//                                 <MockStripeCheckoutForm
//                                     onPaymentSuccess={onCardPaymentSuccess}
//                                     total={total}
//                                 />
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };


// // ===============================================
// // 6. MAIN APPLICATION COMPONENT
// // ===============================================

// const CheckoutApp = () => {
//     // CRITICAL: All hooks called unconditionally at the top level
//     const { register, handleSubmit } = mockUseForm();
//     const { item: cartProducts, resetCart } = useCart();
//     const { token, isLoggedIn } = useAuth();
//     const router = mockUseRouter();

//     const [newUser, setNewUser] = useState(false);
//     const [option, setOption] = useState("cash_on_delivery");
//     const [serverError, setServerError] = useState("");
//     const [isPaymentSucceeded, setIsPaymentSucceeded] = useState(false); // New state for card payment status

//     const delivery = 10.00; // Fixed delivery cost

//     const subtotal = useMemo(() =>
//         Array.isArray(cartProducts)
//             ? cartProducts.reduce(
//                 (acc, item) => acc + item.product.finalPrice * item.quantity,
//                 0
//             )
//             : 0,
//         [cartProducts]
//     );
//     const total = subtotal + delivery;

//     // 1. Order submission function (called directly by Cash on Delivery or by Card Success)
//     const placeOrder = useCallback((data, paymentMethod) => {
//         setServerError(""); 

//         if (cartProducts.length === 0) {
//             setServerError("Your cart is empty. Please add items before placing an order.");
//             return;
//         }

//         if (!token) {
//             setServerError("Authentication required: You must be logged in to place an order.");
//             return;
//         }

//         const fullName = `${data.firstName} ${data.lastName}`;
//         const orderData = {
//             items: cartProducts.map((item) => ({
//                 product: item.product._id,
//                 quantity: item.quantity,
//                 color: item.selectedColor?.name || undefined,
//                 size: item.selectedSize || undefined,
//             })),
//             shippingAddress: { ...data, fullName },
//             paymentMethod: paymentMethod, // Use the determined payment method
//             shippingPrice: delivery,
//             taxPrice: 0,
//         };

//         // Mutation function for the final order API call
//         handleCheckoutOrder({ order: orderData, token: token });
//     }, [cartProducts, delivery, token]);


//     const { mutate: handleCheckoutOrder, isPending } = mockUseMutation({
//         mutationFn: mockCreateOrder,

//         onError: (error) => {
//             const message = error.response?.data?.message || "Order creation failed unexpectedly. Please check console for details.";
//             setServerError(message);
//         },

//         onSuccess: (data) => {
//             console.log("Order success:", data);
//             resetCart();
//             router.push("/success");
//         },
//     });

//     // 2. Handler for the final form submission
//     const onSubmit = useCallback((data) => {
//         if (option === 'cash_on_delivery') {
//             placeOrder(data, 'cash_on_delivery');
//         } else if (option === 'card' && isPaymentSucceeded) {
//             // If card is selected AND payment has already succeeded via the mock form
//             placeOrder(data, 'card');
//         } else if (option === 'card' && !isPaymentSucceeded) {
//             setServerError("Please complete the card payment process first using the 'Pay Now' button.");
//         }
//     }, [option, isPaymentSucceeded, placeOrder]);


//     // 3. Callback triggered by the MockStripeCheckoutForm upon successful payment
//     const handleCardPaymentSuccess = useCallback(() => {
//         // This is where Stripe confirms the payment. Now we set state and let the main form submission handle the order.
//         setIsPaymentSucceeded(true);
//         console.log("Mock Payment Succeeded. Ready to Place Order.");

//         // NOTE: In a real app, you might auto-submit the form here, but for demonstration, 
//         // we update the payment status and re-enable the main 'Place Order' button.
//     }, []);


//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12 font-[Inter]">
//             <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center border-b pb-4">Secure Checkout</h1>
//             <div className="max-w-7xl mx-auto">

//                 <Returing />

//                 {serverError && (
//                     <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md">
//                         <p className="font-semibold text-center">{serverError}</p>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

//                         {/* Billing Details (Left Column) */}
//                         <div className="lg:w-3/5 w-full bg-white p-6 md:p-8 border border-gray-200 rounded-xl shadow-lg h-fit">
//                             <h2 className="mb-6 capitalize font-extrabold text-3xl text-gray-800">
//                                 Billing Details
//                             </h2>

//                             {/* Form Fields */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 font-light text-black">

//                                 <div className="md:col-span-2">
//                                     <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
//                                     <input
//                                         type="text"
//                                         id="country"
//                                         className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400"
//                                         placeholder="Enter your country"
//                                         required
//                                         {...register("country")}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                                     <input
//                                         type="text"
//                                         id="firstName"
//                                         className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400"
//                                         placeholder="Enter your first name"
//                                         required
//                                         {...register("firstName")}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                                     <input
//                                         type="text"
//                                         id="lastName"
//                                         className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400"
//                                         placeholder="Enter your last name"
//                                         required
//                                         {...register("lastName")}
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
//                                     <input
//                                         type="text"
//                                         id="address1"
//                                         className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400 mb-4"
//                                         placeholder="House number and street name"
//                                         required
//                                         {...register("address1")}
//                                     />
//                                     <input
//                                         type="text"
//                                         id="address2"
//                                         className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400"
//                                         placeholder="Apartment, suite, unit, etc. (optional)"
//                                         {...register("address2")}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State / County *</label>
//                                     <input
//                                         type="text"
//                                         id="state"
//                                         className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400"
//                                         placeholder="Enter your state"
//                                         required
//                                         {...register("state")}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-2">Postcode / ZIP *</label>
//                                     <input
//                                         type="text"
//                                         id="poster"
//                                         className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400"
//                                         placeholder="Enter your postcode / zip"
//                                         required
//                                         {...register("poster")}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400"
//                                         placeholder="Enter your email"
//                                         required
//                                         {...register("email")}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
//                                     <input
//                                         type="text"
//                                         id="phone"
//                                         className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400"
//                                         placeholder="Enter your phone number"
//                                         required
//                                         {...register("phone")}
//                                     />
//                                 </div>

//                             </div>

//                             {/* Account Creation Checkbox */}
//                             {!isLoggedIn && (
//                                 <div className="mt-8 border-t pt-6">
//                                     <Checkbox
//                                         checked={newUser}
//                                         onClick={() => setNewUser(!newUser)}
//                                         label="Create an account?"
//                                     />

//                                     {newUser && (
//                                         <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
//                                             <p className="leading-relaxed text-sm my-3 text-gray-600">
//                                                 Create an account by entering a password below.
//                                             </p>
//                                             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
//                                             <input
//                                                 type="password"
//                                                 id="password"
//                                                 className="border border-gray-300 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[#7971ea] focus:border-[#7971ea] transition duration-200 rounded-lg placeholder:text-gray-400"
//                                                 placeholder="Enter your password"
//                                                 required
//                                                 {...register("password")}
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Order Summary (Right Column) */}
//                         <div className="lg:w-2/5 w-full">
//                             <CheckoutDetails
//                                 option={option}
//                                 cartProducts={cartProducts}
//                                 setOption={setOption}
//                                 subtotal={subtotal}
//                                 delivery={delivery}
//                                 total={total}
//                                 onCardPaymentSuccess={handleCardPaymentSuccess}
//                             />

//                             {/* Place Order Button */}
//                             <Button
//                                 type="submit"
//                                 // Disabled if pending OR cart is empty
//                                 // If card is selected, must wait for payment success flag
//                                 disabled={isPending || cartProducts.length === 0 || (option === 'card' && !isPaymentSucceeded)}
//                                 className="mb-4 bg-[#7971ea] w-full mt-6 text-white hover:bg-[#6c64d3]"
//                             >
//                                 {isPending ? "Processing Order..." : (
//                                     option === 'card' && !isPaymentSucceeded ? 
//                                         "Complete Card Payment Above" :
//                                         `Place Order for ₦${total.toFixed(2)}`
//                                 )}
//                             </Button>
                            
//                             {option === 'card' && isPaymentSucceeded && (
//                                 <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-3 rounded-lg shadow-inner text-sm font-medium">
//                                     Payment Confirmed. Click 'Place Order' below to finalize shipment.
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CheckoutApp;


import React from 'react'

const Pay = () => {
  return (
    <div>Pay</div>
  )
}

export default Pay