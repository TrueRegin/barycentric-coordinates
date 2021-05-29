# Barycentric Coordinates Example

## Working Example
You can check out an example at [https://trueregin.github.io/barycentric-coordinates/dist/](https://trueregin.github.io/barycentric-coordinates/dist/)

## Explanation
A special coordinate basis that determines your coordinates as a weight of 3 vectors on a triangle.

This is primarily used in 3D, after you determine if a point exists on a plane to figure out whether a vector is inside or outside of a triangle on that plane. It's very useful for figuring out ray triangle collisions.

A barycentric coordinate consists of 3 weights w1, w2, w3 which coorespond to how much of each coordinate it takes to reach the intersection between a point and a plane.

In the example provided, the intersection between the point and the plane is your mouse coordinate.
Our barycentric calculator takes this mouse coordinate + the vertices of the triangle and calculates 2 of the weights (you only need 2 vectors to span a 2D space)

Now I'll be honest, I don't understand 100% why it works, so if you're curious about the intuition you should look into this topic more.
You can also play around with the code, the barycentric code is under `src/barycentric.ts`

## Running
Run `vite` to load in dev mode.
Run `vite build` to build into a production ready application.

Run `(npm install -g vite)` to install vite globally on your machine.