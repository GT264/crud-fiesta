<?php

namespace GT264\CrudFiesta\Tests\Feature;

use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Model;

use Tests\TestCase;

use GT264\CrudFiesta\Controllers\CrudBaseController;
use GT264\CrudFiesta\Enums\Permission;
use GT264\CrudFiesta\Policies\CrudBasePolicy;
use GT264\CrudFiesta\Enums\Resource;

use Spatie\Permission\Models\Permission as SpatiePermission;

abstract class CrudTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Model $model;
    protected CrudBaseController $crudController;
    protected CrudBasePolicy $policy;

    protected Resource $resource;

    abstract protected function model(): Model;
    abstract protected function crudController(): CrudBaseController;

    abstract protected function policy(): CrudBasePolicy;

    abstract protected function resource(): Resource;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->model = $this->model();
        $this->crudController = $this->crudController();
        $this->policy = $this->policy();
        $this->resource = $this->resource();

        // Generate all crud permissions for this resource
        foreach (
            Permission::cases() as 
            $permission
        ) {
            SpatiePermission::firstOrCreate([
                'name' => $this->resource->value . '-' . $permission->value,
                'guard_name' => 'web',
            ]);
        }
    }

    // User with permission can see index page 
    public function test_assert_user_can_see_index_page(): void
    {
        $this->user->givePermissionTo( $this->resource->value . '-' . Permission::VIEWANY->value);

        $route = route($this->crudController->getRouteNamePrefix() . '.index');

        $this->actingAs($this->user)
            ->get($route)
            ->assertInertia(fn (Assert $page) => $page
                ->component($this->crudController->getInertiaPage())
                //->has('data')
            );
    }

    // User without permission can't see index page
    public function test_assert_user_can_t_see_index_page(): void
    {
        $route = route($this->crudController->getRouteNamePrefix() . '.index');

        $this->actingAs($this->user)
            ->get($route)
            ->assertStatus(403);
    }

}