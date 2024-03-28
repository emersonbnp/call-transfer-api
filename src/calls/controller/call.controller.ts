import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Put,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Call } from '../schemas/call';
import { Pagination } from '../dtos/paginationfilter';
import { RegionFilter } from '../dtos/regionfilter';
import { ICallService } from '../service/call.service.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('calls')
@Controller('/v1/calls')
export class CallController {
  constructor(
    @Inject(ICallService) private readonly callService: ICallService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addCall(@Body() call: Call, @Req() request: any): Promise<Call> {
    const userUuid = request.user.userUuid;
    const newCall = await this.callService.add(call, userUuid);
    try {
      return newCall;
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (e instanceof BadRequestException) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async editCall(@Body() call: Call, @Req() request: any): Promise<Call> {
    const userUuid = request.user.userUuid;
    const editedCall = await this.callService.edit(call, userUuid);
    console.log('EDITED CALL', editedCall)
    try {
      return editedCall;
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (e instanceof BadRequestException) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }

  @Get('/filter')
  async getCallsByFilter(
    @Query('location') location: any,
    @Query('userUuid') userUuid: string,
    @Query('uuid') uuid: string,
    @Query('page') page: any
  ): Promise<Call[]> {
    const filter = new RegionFilter(location || {});
    const pagination = new Pagination(page || {});
    const callsInRegion = await this.callService.getCallsByFilter(
      filter,
      pagination,
      userUuid,
      uuid,
    );
    try {
      return callsInRegion;
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (e instanceof BadRequestException) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() request: any): Promise<Call[]> {
    const userUuid = request.user.userUuid;
    const deletedCall = await this.callService.delete(id, userUuid);
    try {
      return [deletedCall];
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (e instanceof BadRequestException) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }

  @Get('/getCurrentLocalization')
  async getCurrentLocalization(@Body() call: Call, @Req() request: any): Promise<Call> {
          
          const coordinates: number[] = call.details.location.coordinates;
          const [latitude, longitude] = coordinates;
          console.log('CONTROLLER LATITUDE',latitude)
          console.log('CONTROLLER LONGITUDE',longitude)
          console.log('CONTROLLER GOOGLE API KEY:', process.env.GOOGLE_API_URL)

          const currentLocalization = await this.callService.getCurrentLocalization(call);
          try {
            console.log('CURRENT LOCALIZATION------------>', currentLocalization)
            return currentLocalization;   
          } catch (e: any) {
            if (e instanceof NotFoundException) {
              throw new NotFoundException();
            }
            if (e instanceof BadRequestException) {
              throw new BadRequestException();
            }
            throw new InternalServerErrorException();
    }
  }
}
