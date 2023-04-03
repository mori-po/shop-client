import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  getRedirectResult
} from 'firebase/auth'

export const useAuth = () => {
  const token = useState<string | null>('token', () => null)

  async function signInGoogle () {
    const provider = new GoogleAuthProvider()
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth()
      return signInWithPopup(auth, provider)
        .then(async () => {
          const result = await getRedirectResult(auth)
          if (result) {
            // This gives you a Facebook Access Token.
            const credential = GoogleAuthProvider.credentialFromResult(result)
            console.log('signInGoogle Check', credential)
            if (credential) {
              token.value = credential.idToken ?? null
              console.log('signInGoogle OK')
              resolve()
            }
          } else {
            console.log('signInGoogle NG')
            resolve()
          }
        })
        .catch(reject)
    })
  }

  async function signIn (email: string, password: string) {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth()
      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user
            .getIdToken()
            .then((idToken) => {
              token.value = idToken
              resolve()
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }

  async function signOut () {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth()
      firebaseSignOut(auth)
        .then(() => {
          token.value = null
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async function checkAuthState () {
    return await new Promise<void>((resolve, reject) => {
      // client only
      if (process.server) { return resolve() }
      const auth = getAuth()
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            user
              .getIdToken()
              .then((idtoken) => {
                token.value = idtoken
                resolve()
              })
              .catch(reject)
          } else {
            token.value = null
            resolve()
          }
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  return {
    signIn,
    signInGoogle,
    signOut,
    token,
    checkAuthState
  }
}
