export default function SignupPage() {
  return <h1>Signup Page</h1>;
}

export async function action({ request /** you'll need this */ }) {
  /**
   * STEP 1.
   * extract data from the user's request object
   */
  // example: const data = await request.formData(); // request is given as a prameter
  // TODO...
  /**
   * STEP 2.
   * construct the response object
   */
  // example: const response = await fetch( backend_auth_endpoint, { method, headers: { }, body: JSON.stringify(auth_data), });
  // TODO...
  /**
   * STEP 3.
   * respond to unvalid requests
   */
  /** The following lines will be uncommented after you implement the response object */
  //   if (response.status === 422 || response.status === 401) {
  //     return response;
  //   }
  //   if (!response.ok) {
  //     throw json({ message: "Could not authenticate user." }, { status: 500 });
  //   }
  // TODO...
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
