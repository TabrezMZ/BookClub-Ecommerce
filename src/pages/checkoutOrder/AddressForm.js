import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { toast } from "react-hot-toast";

export const AddressForm = () => {
    const { productState, productDispatch ,addressForm, setAddressForm} = useProduct();
    const { address } = productState;
    console.log(addressForm);
    const navigate = useNavigate()
    const fillFormValue = (e, fieldname) => {
        // setAddressForm((prev)=> {
        //   return {
        //     ...prev,
        //     [fieldname] : e.target.value
        //     }
        // })
        setAddressForm((prev) => ({ ...prev, [fieldname]: e.target.value }))
    }

    const saveHandler = (e) => {
        e.preventDefault();
        // console.log(addressForm);
        const editAddload = address.find((item)=> item.id === addressForm.id)
        console.log(editAddload);
        if(editAddload!==undefined){
            productDispatch({type : 'EDIT_ADDRESS', payload : addressForm })
            toast.success('address changed successfully')
        }
        else{
            productDispatch({ type: 'ADD_ADDRESS', payload: [{...addressForm , id : address.length == 0 ? 1 : address[address.length - 1].id + 1}] })
            toast.success('address added successfully')
        }
        navigate('/ordercheckout')
    }
    const cancelForm = (e) => {
        e.preventDefault();
        navigate('/ordercheckout')
    }
    const fillFormValueWithDummy = (e) => {
        e.preventDefault();
        setAddressForm({
            name: 'John Doe',
            street: '123 Street',
            city: 'New York',
            state: 'NY',
            zipcode: '12345',
            country: 'USA',
            mobile: '1234567890',
        })
    }
    return (
        <>
            <div
                className={`address-form-container flex-center`}
            >
                <form className="address-form"
                    onSubmit={(e) => saveHandler(e)}
                >
                    <h4>ADD NEW ADDRESS</h4>
                    <div className="form-input">
                        <input
                            placeholder="Enter Name"
                            className="text-input address-form-input"
                            type="text"
                            value={addressForm.name}
                            onChange={(e) => fillFormValue(e, "name")}
                            required
                        />
                        <input
                            placeholder="Enter House No. , Road , Colony"
                            className="text-input address-form-input"
                            type="text"
                            value={addressForm.street}
                            onChange={(e) => fillFormValue(e, "street")}
                            required
                        />
                        <input
                            placeholder="Enter City"
                            className="text-input address-form-input"
                            type="text"
                            value={addressForm.city}
                            onChange={(e) => fillFormValue(e, "city")}
                            required
                        />
                        <input
                            placeholder="Enter State"
                            className="text-input address-form-input"
                            type="text"
                            value={addressForm.state}
                            onChange={(e) => fillFormValue(e, "state")}
                            required
                        />
                        <input
                            placeholder="Enter Country"
                            className="text-input address-form-input"
                            type="text"
                            value={addressForm.country}
                            onChange={(e) => fillFormValue(e, "country")}
                            required
                        />
                        <input
                            placeholder="Enter Postal Code"
                            className="text-input address-form-input"
                            type="text"
                            value={addressForm.zipcode}
                            onChange={(e) => fillFormValue(e, "zipcode")}
                            required
                        />
                        <input
                            placeholder="Enter Mobile Number"
                            className="text-input address-form-input"
                            type="text"
                            value={addressForm.mobile}
                            onChange={(e) => fillFormValue(e, "mobile")}
                            required
                        />
                    </div>
                    <div className="address-form-btn">
                        <input
                            className="btn link-btn address-save"
                            type="submit"
                            value="Save"
                        />
                        <input
                            type="reset"
                            className="btn danger address-cancel"
                            onClick={(e) => cancelForm(e)}
                            value="Cancel"
                        />
                        <input
                            type="submit"
                            className="btn default address-cancel"
                            onClick={(e) => fillFormValueWithDummy(e)}
                            value="Fill with Dummy Values"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}