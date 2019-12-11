# Project files structure
README file for folders standards.
# src directory
    - Assets
    - Components
    - Store
    - Utils
# Assets
    -Elements
    -Images
### Elements
The elements directory purpose is to store all the generic elements,styled-components and costume-components.

    Creating a new element:
    create a new directory inside elements and name it with 'CapitalLetter'.
    - Example: 'StyledComponent'.
    
    Each folder needs to contain a .js file and .module.css file (if it's not a styled component) with the same name as the directory name.
### Images
    The images directory purpose is to store all the images.
# Components
The components directory purpose is to store all the 'logical' components and their specified elements.

    Creating a new component:
    create a new directory inside components and name it with 'CapitalLetters'.
    - Example: 'VaccinesName'
    
    Each folder needs to contain a .js file and .module.css file with the same name as the directory name.
    and inside all of his specified elements following the same structure in 'Elements' just inside the component directory.
# Store
The Store directory purpose is to store all the 'store' (state) overall, all redux actions, actionTypes and reducers are going to be placed here.
### Actions
    *{Name} needs to be the same name related to the 'logical' component if it's related it.
    Creating a new actions:
    create a new directory inside Store/Actions/{Name}Actions with 'CapitalLetters'.
    -Example: 'LoginActions'
    
    Inside the directory create two seperate JS files one contains {Name}Actions.js
    and the second one {Name}ActionTypes.js.
    
    The {Name}ActionTypes.js file is going to export all the available ActionTypes so there won't be any typo errors.
    All the Types must be CAPS.
    -Example:
        `export const START_LOGIN = 'START_LOGIN';
    
    The {Name}Action.js is going to export all the available Actions.
    All actions must be 'camelCased' names with Action added into the name.
    To notice the difference between Actions and Component functions.
    -Example:
        `export const loginAction  = () => {
            return {
            type: 'name of the action type'
            payload: 'data'
        }
    }`
### Reducers
    *{Name} needs to be the same name related to the 'logical' component if it's related it.
    Creating a new reducer:
    create a new JS file inside the reducer {Name}Reducer.js.
    -Example:
        'LoginReducer'
    Inside create a function with the same {Name} just 'camelCased'.
    -Example:
        'const loginReducer = (state=INITIAL_STATE, action) => {
            switch(action.type){
                case LOGIN:
                return {
                    ...state,
                    {data}: action.{data}
                }
                default:
                return state;
            }
        
        } 
  
# Utils
The utils directory purpose is to store all the utility functions such as implementing the API calls
to the server or functions that are not related to any components or functions that are used over and over again so we could implement the DRY(Don't repeat yourself) principles.
### Helpers
    Helpers are functions that are used many time over the project and can be stored here, instead of repeating ourselves in the code.
### Services
    Services is where all the API calls are going to be stored.
    
