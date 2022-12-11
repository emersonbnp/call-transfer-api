import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
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
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addCall(
    @Res() response: any,
    @Req() request: any,
    @Body() call: Call,
  ): Promise<Call> {
    const { user } = request;
    call.userUuid = user.userUuid;
    const newCall = await this.callService.add(call);
    try {
      return response.status(HttpStatus.CREATED).json({ data: newCall });
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).json();
      }
      if (e instanceof BadRequestException) {
        return response.status(HttpStatus.BAD_REQUEST).json();
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }

  @Get('/filter')
  async getCallsByFilter(
    @Query('location') location: any,
    @Query('userUuid') userUuid: string,
    @Query('page') page: any,
    @Res() response: any,
  ): Promise<Call[]> {
    const filter = new RegionFilter(location || {});
    const pagination = new Pagination(page || {});
    const callsInRegion = await this.callService.getCallsByFilter(
      filter,
      pagination,
      userUuid,
    );
    try {
      return response.status(HttpStatus.OK).json({ data: callsInRegion });
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).json();
      }
      if (e instanceof BadRequestException) {
        return response.status(HttpStatus.BAD_REQUEST).json();
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Res() response: any,
    @Req() request: any,
  ): Promise<Call[]> {
    const { user } = request;
    const deletedCall = await this.callService.delete(id, user);
    try {
      return response.status(HttpStatus.OK).json({ data: deletedCall });
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).json();
      }
      if (e instanceof BadRequestException) {
        return response.status(HttpStatus.BAD_REQUEST).json();
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }
}
