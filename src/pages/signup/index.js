export default function SignupPage() {
  return (
    <>
      {/* TODO
            1. Add signup form: first name, last name, email address, password
            2. Add login link: redirect to /login
            3. Submit user's data via the action below.
        */}
    </>
  );
}

export async function action({ request /** you'll need this */ }) {
  /**
   * What's an action function?
   * Using simple words, an action is a function that fires automatically, by react-router-dom,
   * when a non-get request, post/put/delete, is sent to your router.
   *
   * Suppose we want to submit the signup form to the server, you will
   * need to handle a post request sent via your registeration form.
   * You can use the action to submit these data.
   */
  /**
   * STEP 1. extract data from the user's request object
   * STEP 2. construct the response object
   * STEP 3. respond to unvalid requests
   */
  /** The following lines will be uncommented after you implement the response object */
  //   if (response.status === 422 || response.status === 401) {
  //     return response;
  //   }
  //   if (!response.ok) {
  //     throw json({ message: "Could not authenticate user." }, { status: 500 });
  //   }
  /**
     * EXTRA
     * If you want to use search params inside this function,
     *  use the, native JavaScript, URL constructor.
     *  As the example below:
     *      const searchParams = new URL(request.url).searchParams;
            const mode = searchParams.get('mode') || 'login';
     */
  // soon: manage that token
  //   return redirect('/');
}
