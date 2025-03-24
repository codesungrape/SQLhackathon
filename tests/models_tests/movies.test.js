import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { fetchAllMovies } from "../../models/movies";
import { pool } from "../../db/index.js";

describe("fetchAllMovies", () => {
  beforeEach(async () => {
    // Delete dependent reviews first
    await pool.query("DELETE FROM reviews WHERE movies_id IS NOT NULL");
    // Set up the database for each test case -empty the movies table before each test
    await pool.query("DELETE FROM movies");
  });

  test("SQL command returns succesfully with multiple movie objects", async () => {
    //arrange
    // Insert multiple movie records into the database before running the query
    await pool.query(`
        INSERT INTO movies (movie_name, release_date, box_office_gross, lead_actor, director) VALUES
        ('Amores Perros', '2000-05-19', 20940000, 'Gael García Bernal', 'Alejandro González Iñárritu'),
        ('Birdman', '2014-10-17', 103215094, 'Michael Keaton', 'Alejandro González Iñárritu')
      `);
    //act
    const result = await fetchAllMovies();
    //assert
    expect(Array.isArray(result)).toBe(true); // result is an array
    expect(result).toBeDefined(); // Ensure result is defined
  });
  test("SQL command returns an array with one movie WHEN one movie is in the database", async () => {
    // act
    await pool.query(`
        INSERT INTO movies (movie_name, release_date, box_office_gross, lead_actor, director) VALUES
        ('Amores Perros', '2000-05-19', 20940000, 'Gael García Bernal', 'Alejandro González Iñárritu')
      `);
    const result = await fetchAllMovies();
    // assert
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1); // Ensure the array has one value
    expect(result).toBeDefined();
  });
  test("SQL command returns an empty array when no movies are in the database", async () => {
    // act
    const result = await fetchAllMovies();

    // assert
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0); // Ensure the array is empty when no data is found
    expect(result).toBeDefined();
  });
});
