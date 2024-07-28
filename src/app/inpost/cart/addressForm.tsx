import {useState} from "react";
import classNames from "classnames";
import {PlaceOrderButton} from "@/app/inpost/cart/PlaceOrderButton";

export const AddressForm = ({createInpost, showPlaceOrderButton}) => {

  const [formErrors, setFormErrors] = useState({})

  const inputInvalidClasses = "w-full h-9 mb-2 p-1 rounded text-black bg-red-200"
  const inputValidClasses = "w-full h-9 mb-2 p-1 rounded text-black"

  const onSubmit = async(e) => {
    e.preventDefault();

    const email = e.target.form.email.value;
    const phone = e.target.form.phone.value;
    const pachkomat = e.target.form.pachkomat.value

    const _formErrors = {}
    if(!email){
      _formErrors.email = {required: true}
    }
    if(!pachkomat){
      _formErrors.pachkomat = {required: true}
    }
    if(Object.keys(_formErrors).length){
      return setFormErrors(_formErrors)
    }
    createInpost({email, phone, pachkomat})
  }

  return <div className="p-4 w-full">
    <form className="text-center">
      <h2 className="mb-10">
        Enter your data
      </h2>
      <input className={formErrors.email?.required ? inputInvalidClasses : inputValidClasses} name="email"
             placeholder="Email*"/>
      {formErrors.email?.required && <div className="text-xs text-red-300 text-left mb-2">
        Email is required
      </div>}
      <input className="w-full h-9 mb-2 p-1 rounded text-black" name="phone" placeholder="Phone Number"/>
      <input className={formErrors.pachkomat?.required ? inputInvalidClasses : inputValidClasses} name="pachkomat"
             placeholder="Pachkomat*"/>
      {formErrors.pachkomat?.required && <div className="text-xs text-red-300 text-left mb-2">
        Pachkomat is required
      </div>}
      <div className="text-left text-blue-300">
        <a target="_blank" href="https://inpost.pl/znajdz-paczkomat">Find your pachkomat</a>
      </div>

      <PlaceOrderButton onSubmit={onSubmit} show={showPlaceOrderButton} />

    </form>
  </div>
}
