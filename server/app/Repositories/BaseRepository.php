<?php

namespace App\Repositories;

use Carbon\Carbon;

class BaseRepository {

    /**
     * The Model instance.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * Get number of records.
     *
     * @return int
     */
    public function count()
    {
        $total = $this->model->count();
        return $total;
    }

    /**
     * Destroy a model.
     *
     * @param  int $id
     * @return int
     */
    public function destroy($id)
    {
        return $this->model->destroy((int)$id);
    }

    /**
     * Get Model by id.
     *
     * @param  int  $id
     * @param  array $columns
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function find($id, $columns = ['*'])
    {
        return $this->model->find((int)$id, $columns);
    }

    /**
     * Get All Models
     *
     * @param  array $columns
     * @return \Illuminate\Support\Collection
     */
    public function all($columns = ['*'])
    {
        return $this->model->all($columns);
    }

    /**
     * Create a model.
     *
     * @param  array $inputs
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create($inputs)
    {
        return $this->model->create($inputs);
    }

    /**
     * Create multiple models.
     *
     * @param  array $inputs
     * @return int
     */
    public function insert($inputs)
    {
        $now = Carbon::now();
        foreach($inputs as &$input) {
            $input['created_at'] = $now;
            $input['updated_at'] = $now;
        }
        return $this->model->insert($inputs);
    }

     /**
     * Update a model.
     *
     * @param array $attributes
     * @param int $id
     * @return bool|int
     */
    public function update($attributes, $id)
    {
        $id_column = $this->model->getKeyName();
        return $this->model->where($id_column, (int)$id)->update($attributes);
    }

    /**
     * Get Table Name
     *
     * @return string
     */
    public function tableName()
    {
        return $this->model->getTable();
    }

    /**
     * Get an array with the values of a given column.
     *
     * @param  string  $column
     * @param  string  $key
     * @return \Illuminate\Support\Collection
     */
    public function lists($column, $key = null)
    {
        return $this->model->lists($column, $key);
    }

    /**
     * Create or update a record matching the attributes, and fill it with values.
     *
     * @param  array  $attributes
     * @param  array  $values
     * @param  array  $options
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function updateOrCreate($attributes, $values = [], $options = [])
    {
        return  $this->model->updateOrCreate($attributes, $values, $options);
    }

}
