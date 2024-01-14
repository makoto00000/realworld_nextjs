type InputProps = {
  key: number
  type: string,
  placeholder: string,
  name: string,
}

export default function FormInput({key, type, placeholder, name}: InputProps) {

  return(
    <fieldset className="form-group" key={key}>
      <input className="form-control form-control-lg"
      type={type}
      placeholder={placeholder}
      name={name}/>
    </fieldset>
  )
}