// Simplified version of use-toast for now
import * as React from "react"

export const useToast = () => {
    return {
        toast: (props: any) => {
            console.log("Toast:", props)
            alert(props.title + "\n" + props.description)
        },
        dismiss: (toastId?: string) => { },
    }
}
