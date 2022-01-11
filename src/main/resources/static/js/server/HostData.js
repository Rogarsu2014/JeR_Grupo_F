let isClientHost=false

export  function isHost(){
    return isClientHost;
}

export  function setAsHost(){
    isClientHost=true
}

export function removeHostProperty(){
    isClientHost=false
}