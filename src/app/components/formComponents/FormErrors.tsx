import { Errors } from "@/types"

export default function FormErrors(errors: Errors | null) {
  if (errors) {
    return (
      <ul className="error-messages">
        {Object.entries(errors.errors.body).map((error) => (
          error[1].map((err, i) => (
            <li key={i}>{error[0]} {err}</li>
          ))
        ))}
      </ul>
    )
  }
}