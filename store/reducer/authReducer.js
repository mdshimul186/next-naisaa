
let init ={
    user:{},
    profile:{},
    authenticated: false,
    signin: false,
    signup: false,
    notification:[],
    messages:[],
    setting:{},
    snack:{open:false,message:"",type:''}
}

const authReducer = (state=init, action)=>{
    switch (action.type) {
        case "SET_USER":
       return{
           ...state,
           user:action.payload,
           authenticated: true
        }
        case 'SET_PROFILE':
            return{
                ...state,
                profile:action.payload
            }
        case "SHOW_SIGNIN":
       return{
           ...state,
           signin: true
        }
        case "HIDE_SIGNIN":
       return{
           ...state,
           signin: false
        }
        case "SHOW_SIGNUP":
            return{
                ...state,
                signup: true
             }
             case "HIDE_SIGNUP":
            return{
                ...state,
                signup: false
             }
        case "LOGOUT":
        return{
            user:{},
            authenticated: false,
            loading: false,
            snack:{open:false,message:"",type:''}
            }
        case "SNACKBAR":
            return{
                ...state,
                snack:action.payload
            }
        case "SET_NOTIFICATION":
            return{
                ...state,
                notification:action.payload
            }
        case "SET_SETTING":
            return{
                ...state,
                setting:action.payload
            }
        case "SET_MESSAGES":
            return{
                ...state,
                messages:action.payload
            }
        case "NEW_MESSAGES":
            let index = state.messages.findIndex(msg=>msg._id === action.payload._id)
            console.log(action.payload);
            if(index === -1){
                return{
                    ...state,
                    messages:[action.payload,...state.messages]
                }
            }else{
                state.messages[index] = action.payload
                
                return{
                    ...state
                }
            }
            
    
        default:
            return state;
    }
}

export default authReducer